/**
 * Static structural scan of a form's element tree, plus value-dependent
 * visibility evaluation and payload omission. This is the submit/visibility
 * brain: `scanFormChildren` walks the JSX tree as DATA (it never renders and
 * calls no hooks — verification gate), `evaluateVisibility` runs the compiled
 * rules against a snapshot of values, and `omitHiddenValues` strips hidden
 * paths from the payload as a deny-list.
 *
 * Node recognition is ALWAYS by static string marker, never by component
 * reference (KTD7): `child.type.formNodeType` for Form.When / Form.Tabs and
 * `child.type.inputName` for fields — the same convention two existing
 * scanners (FormTabs.collectFieldNames, CrudIndexPageContext) already rely on.
 */
import React from 'react'
import {
    compileRule,
    getValueByPath,
    omitPaths,
    type FieldRules,
    type FormRulesMap,
    type RuleInput,
} from './rules'

const WARN_PREFIX = '[Admiral]'

type Values = Record<string, unknown>

/**
 * A single discovered node of the scan. The tree is value-independent: branches
 * that depend on values (Form.When, ArrayInput rows) keep the data needed to
 * resolve them later (`rule`, `children`) rather than a decision.
 */
export type ScanNode = FieldNode | WhenNode | ArrayNode | TranslatableNode

/** A leaf field (or any input with rule props): TextInput, SelectInput, … */
export type FieldNode = {
    kind: 'field'
    /** Field name as written on the element (un-prefixed). */
    name: string
    /** JSX `visibleWhen` if present — wins over the rules-map `visible`. */
    visibleWhen?: RuleInput
    /** Present only to count toward `hasRules`; never affects hidden paths. */
    hasDisabledWhen: boolean
    hasRequiredWhen: boolean
    /** `keepInPayload` opts the field's value out of omission even when hidden. */
    keepInPayload: boolean
}

/** A Form.When group: its rule gates every node inside. */
export type WhenNode = {
    kind: 'when'
    rule: RuleInput
    children: ScanNode[]
}

/**
 * An ArrayInput. Rows are value-dependent, so the row template is captured
 * unresolved: at eval time it is resolved per index against the row scope.
 */
export type ArrayNode = {
    kind: 'array'
    name: string
    /** Rule props on the ArrayInput element itself hide the whole `name`. */
    visibleWhen?: RuleInput
    hasDisabledWhen: boolean
    hasRequiredWhen: boolean
    keepInPayload: boolean
    /** The row template — node or `(rowValues, idx) => node`. */
    rowTemplate: React.ReactNode | ((item: Values, idx: number) => React.ReactNode)
    /** A pre-scan of a static (non-function) template, reused for every row. */
    staticRowScan?: ScanNode[]
}

/** A TranslatableInput: scoped `{ [lang]: value }`; inner rule props are ignored by design. */
export type TranslatableNode = {
    kind: 'translatable'
    name: string
    languages: string[]
    visibleWhen?: RuleInput
    hasDisabledWhen: boolean
    hasRequiredWhen: boolean
    keepInPayload: boolean
}

/** The output of the structural scan — memoizable by `[children, rulesMap]` upstream. */
export type FormScan = {
    nodes: ScanNode[]
    rulesMap?: FormRulesMap
    /** True if any rule prop / Form.When / non-empty rulesMap was found (R18 fast-path). */
    hasRules: boolean
}

const getStatic = (type: unknown, key: string): unknown =>
    typeof type === 'string' ? undefined : (type as Record<string, unknown> | null)?.[key]

const ruleProp = (props: Record<string, unknown>, key: string): RuleInput | undefined =>
    props[key] as RuleInput | undefined

/**
 * Walk `children` and build the scan tree. Pure structural pass — no values.
 * `hasRules` is accumulated through a mutable flag carried in the walk.
 */
export function scanFormChildren(children: React.ReactNode, rulesMap?: FormRulesMap): FormScan {
    const state = { hasRules: false }
    const nodes = walk(children, state)
    const hasRules = state.hasRules || (rulesMap !== undefined && Object.keys(rulesMap).length > 0)
    return { nodes, rulesMap, hasRules }
}

function walk(children: React.ReactNode, state: { hasRules: boolean }): ScanNode[] {
    const nodes: ScanNode[] = []

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return

        const type = child.type
        const props = child.props as Record<string, unknown>

        // 1. Form.When — static marker `formNodeType === 'when'`.
        if (getStatic(type, 'formNodeType') === 'when') {
            state.hasRules = true
            nodes.push({
                kind: 'when',
                rule: props.rule as RuleInput,
                children: walk(props.children as React.ReactNode, state),
            })
            return
        }

        // 2. Form.Tabs — static marker `formNodeType === 'tabs'`. Children live
        //    inside `items[].children`, not `props.children`.
        if (getStatic(type, 'formNodeType') === 'tabs') {
            const items = props.items as Array<{ children?: React.ReactNode }> | undefined
            for (const item of items ?? []) {
                nodes.push(...walk(item?.children, state))
            }
            return
        }

        const inputName = getStatic(type, 'inputName')

        // 3. ArrayInput — rows are value-dependent; capture the template.
        if (inputName === 'ArrayInput' && typeof props.name === 'string') {
            const node = readArrayInput(props, state)
            nodes.push(node)
            return
        }

        // 4. TranslatableInput — inner fields' rule props are excluded by design.
        if (inputName === 'TranslatableInput' && typeof props.name === 'string') {
            nodes.push(readTranslatableInput(props, state))
            return
        }

        // 5. Leaf field — any other element with an `inputName` string + `name`.
        if (typeof inputName === 'string' && typeof props.name === 'string') {
            nodes.push(readField(props, state))
            return
        }

        // 6. Anything else (Fragments, arrays, Form.Fields, custom wrappers, DOM)
        //    is transparent — recurse into its children.
        nodes.push(...walk(props.children as React.ReactNode, state))
    })

    return nodes
}

function noteRuleProps(props: Record<string, unknown>, state: { hasRules: boolean }) {
    const visibleWhen = ruleProp(props, 'visibleWhen')
    const hasDisabledWhen = props.disabledWhen !== undefined
    const hasRequiredWhen = props.requiredWhen !== undefined
    if (visibleWhen !== undefined || hasDisabledWhen || hasRequiredWhen) state.hasRules = true
    return {
        visibleWhen,
        hasDisabledWhen,
        hasRequiredWhen,
        keepInPayload: props.keepInPayload === true,
    }
}

function readField(props: Record<string, unknown>, state: { hasRules: boolean }): FieldNode {
    return { kind: 'field', name: props.name as string, ...noteRuleProps(props, state) }
}

function readArrayInput(props: Record<string, unknown>, state: { hasRules: boolean }): ArrayNode {
    const rowTemplate = props.children as ArrayNode['rowTemplate']
    // A static (non-function) template is identical for every row, so it can be
    // scanned once here; a function template is resolved per-row at eval time.
    const isFunctionTemplate = typeof rowTemplate === 'function'
    const staticRowScan = isFunctionTemplate ? undefined : walk(rowTemplate, state)
    // A function row-template is opaque to the static pass — its inner rule props
    // can't be seen until eval. Conservatively flag hasRules so U4 never fast-paths
    // past a hidden row field (R4/R18 correctness).
    if (isFunctionTemplate) state.hasRules = true
    return {
        kind: 'array',
        name: props.name as string,
        ...noteRuleProps(props, state),
        rowTemplate,
        staticRowScan,
    }
}

function readTranslatableInput(
    props: Record<string, unknown>,
    state: { hasRules: boolean },
): TranslatableNode {
    const languages = (props.languages as Array<{ value: string }> | undefined) ?? []
    return {
        kind: 'translatable',
        name: props.name as string,
        languages: languages.map((lang) => lang.value),
        ...noteRuleProps(props, state),
    }
}

const joinPath = (scope: string, name: string) => (scope ? `${scope}.${name}` : name)

/**
 * Evaluate the scan against a snapshot of values.
 *
 * - `scannedPaths`: EVERY field path the scan discovered (ruled or not),
 *   including array-row paths `name.idx.field` and translatable `name.lang`.
 * - `hiddenPaths`: every discovered path that evaluates hidden, plus any
 *   rules-map-hidden root path.
 * - `keepPaths`: every discovered path whose node set `keepInPayload` (correctly
 *   prefixed for array rows) — the caller passes this to `omitHiddenValues`.
 * - `hasRules`: structural flag from the scan (value-independent).
 *
 * A field is hidden when ANY enclosing Form.When rule is false OR its own
 * effective `visible` rule is false. JSX `visibleWhen` wins over
 * `rulesMap[path].visible`; they never AND for the same field. `disabledWhen` /
 * `requiredWhen` never affect hidden paths. The rules-map applies at the root
 * scope only (v1).
 */
export function evaluateVisibility(
    scan: FormScan,
    values: Values,
): {
    hiddenPaths: Set<string>
    scannedPaths: Set<string>
    keepPaths: Set<string>
    hasRules: boolean
} {
    const hiddenPaths = new Set<string>()
    const scannedPaths = new Set<string>()
    const keepPaths = new Set<string>()

    evaluateNodes(scan.nodes, values, '', true, scan.rulesMap, hiddenPaths, scannedPaths, keepPaths)

    if (scan.rulesMap) {
        applyRootRulesMap(scan.rulesMap, values, scannedPaths, hiddenPaths)
    }

    return { hiddenPaths, scannedPaths, keepPaths, hasRules: scan.hasRules }
}

function evaluateNodes(
    nodes: ScanNode[],
    values: Values,
    scope: string,
    ancestorsVisible: boolean,
    rulesMap: FormRulesMap | undefined,
    hiddenPaths: Set<string>,
    scannedPaths: Set<string>,
    keepPaths: Set<string>,
) {
    for (const node of nodes) {
        if (node.kind === 'when') {
            const whenVisible = compileRule(node.rule)(values)
            evaluateNodes(
                node.children,
                values,
                scope,
                ancestorsVisible && whenVisible,
                rulesMap,
                hiddenPaths,
                scannedPaths,
                keepPaths,
            )
            continue
        }

        if (node.kind === 'array') {
            evaluateArray(
                node,
                values,
                scope,
                ancestorsVisible,
                rulesMap,
                hiddenPaths,
                scannedPaths,
                keepPaths,
            )
            continue
        }

        // field | translatable — both occupy a single discovered path.
        const path = joinPath(scope, node.name)
        scannedPaths.add(path)
        if (node.keepInPayload) keepPaths.add(path)
        if (node.kind === 'translatable') {
            for (const lang of node.languages) scannedPaths.add(`${path}.${lang}`)
        }

        if (!isVisible(node, path, values, ancestorsVisible, rulesMap)) {
            hiddenPaths.add(path)
        }
    }
}

function evaluateArray(
    node: ArrayNode,
    values: Values,
    scope: string,
    ancestorsVisible: boolean,
    rulesMap: FormRulesMap | undefined,
    hiddenPaths: Set<string>,
    scannedPaths: Set<string>,
    keepPaths: Set<string>,
) {
    const path = joinPath(scope, node.name)
    scannedPaths.add(path)
    if (node.keepInPayload) keepPaths.add(path)

    const visible = isVisible(node, path, values, ancestorsVisible, rulesMap)
    if (!visible) hiddenPaths.add(path)

    // Rows are value-dependent. `values` here is the current scope, so the
    // array is read by its bare `name` (not the prefixed path). Treat a missing
    // array as `[]` (a required-ArrayInput phantom row must not crash and
    // produces no omit).
    const raw = getValueByPath(values, node.name)
    const rows = Array.isArray(raw) ? raw : []

    rows.forEach((rowValues, idx) => {
        const rowScope = `${path}.${idx}`
        const scopedValues = (rowValues ?? {}) as Values
        const rowNodes =
            node.staticRowScan ??
            walk(
                (node.rowTemplate as (item: Values, idx: number) => React.ReactNode)(
                    scopedValues,
                    idx,
                ),
                {
                    hasRules: false,
                },
            )
        evaluateNodes(
            rowNodes,
            scopedValues,
            rowScope,
            visible,
            // Row scope is a child form: the root rules-map does not reach into it.
            undefined,
            hiddenPaths,
            scannedPaths,
            keepPaths,
        )
    })
}

/**
 * A node's effective visibility: false when an ancestor When is hidden, or when
 * its own effective `visible` rule is false. JSX `visibleWhen` wins over the
 * rules-map; they do not AND for the same field. The rules-map is consulted
 * only at the root scope (scope === '').
 */
function isVisible(
    node: FieldNode | ArrayNode | TranslatableNode,
    path: string,
    values: Values,
    ancestorsVisible: boolean,
    rulesMap: FormRulesMap | undefined,
): boolean {
    if (!ancestorsVisible) return false

    if (node.visibleWhen !== undefined) {
        return compileRule(node.visibleWhen)(values)
    }

    const mapVisible = rulesMap?.[path]?.visible
    if (mapVisible !== undefined) {
        return compileRule(mapVisible)(values)
    }

    return true
}

/**
 * Apply root-scope rules-map entries. A `visible` rule hides its path (this is
 * the escape hatch — it works even for a path the scan never saw). A map key
 * with no discovered field AND no value path emits one unknown-key warn.
 */
function applyRootRulesMap(
    rulesMap: FormRulesMap,
    values: Values,
    scannedPaths: Set<string>,
    hiddenPaths: Set<string>,
) {
    for (const [path, block] of Object.entries(rulesMap)) {
        const seenByScan = scannedPaths.has(path)
        const hasValuePath = getValueByPath(values, path) !== undefined

        if (!seenByScan && !hasValuePath) {
            console.warn(
                `${WARN_PREFIX} The rules-map key "${path}" matches neither a discovered field ` +
                    `nor a value path. In v1 the rules-map applies at the root scope only; ` +
                    `check the key spelling against your field names.`,
            )
            continue
        }

        // For a field the scan already handled, its JSX `visibleWhen` (if any)
        // has already won inside evaluateNodes; only escape-hatch paths (unseen
        // by the scan but present in values) need the map's `visible` applied
        // here. A seen field with no JSX rule was driven by the map in
        // evaluateNodes, so re-applying is harmless but unnecessary.
        if (seenByScan) continue

        const visible = (block as FieldRules).visible
        if (visible !== undefined && !compileRule(visible)(values)) {
            hiddenPaths.add(path)
        }
    }
}

/**
 * Deny-list omit (R16): omit (`hiddenPaths` − `keepInPayload`) from `values`
 * via U1's `omitPaths`. Any key the scan never saw passes through untouched,
 * and untouched branches keep reference identity (guaranteed by `omitPaths`).
 */
export function omitHiddenValues(
    values: Values,
    hiddenPaths: Set<string>,
    keepInPayload: Set<string>,
): Values {
    const pathsToOmit = [...hiddenPaths].filter((path) => !keepInPayload.has(path))
    return omitPaths(values, pathsToOmit)
}
