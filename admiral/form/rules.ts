/**
 * Pure, headless rule engine for conditional & dependent form fields.
 *
 * This module is the single source of truth for evaluating field rules across
 * render, static scan and submit. It MUST NOT import React — it operates on
 * plain values only (verification gate).
 *
 * DSL grammar (frozen as the server contract, see MIGRATION.md):
 *
 *   Rule      = Condition | { and: Rule[] } | { or: Rule[] } | { not: Rule }
 *   Condition = { field, is }   | { field, not } | { field, in }
 *             | { field, empty } | { field, gt | gte | lt | lte }
 *   field     = exact scope key first, else dot-path (name.en, items.0.x)
 *   empty     = undefined | null | '' | []  ;  0, false, {} are NOT empty
 */

const WARN_PREFIX = '[Admiral]'

export type Primitive = string | number | boolean | null

export type Condition =
    | { field: string; is: Primitive }
    | { field: string; not: Primitive }
    | { field: string; in: Primitive[] }
    | { field: string; empty: boolean }
    | { field: string; gt: number }
    | { field: string; gte: number }
    | { field: string; lt: number }
    | { field: string; lte: number }

export type Rule = Condition | { and: Rule[] } | { or: Rule[] } | { not: Rule }

/** A rule is either the serializable DSL or an arbitrary predicate over scope values. */
export type RuleInput = Rule | ((values: Record<string, unknown>) => boolean)

/** Per-field rule block — the format of the Form `rules` prop and the future server block. */
export type FieldRules = {
    visible?: RuleInput
    disabled?: RuleInput
    required?: RuleInput
}

/** Map of root scope key → its rule block. */
export type FormRulesMap = Record<string, FieldRules>

type Values = Record<string, unknown>
type Predicate = (values: Values) => boolean

/**
 * Resolve a field reference against a values scope. The exact key is tried
 * first (so a flat key like `seo.title` or a numeric-looking key resolves
 * before traversal); otherwise the path is split on `.` and walked, with
 * numeric segments indexing arrays. Any undefined/null intermediate short-
 * circuits to `undefined` rather than throwing.
 */
export function getValueByPath(values: Values, path: string): unknown {
    if (path in values) return values[path]

    const segments = path.split('.')
    let current: unknown = values
    for (const segment of segments) {
        if (current == null) return undefined
        current = (current as Record<string, unknown>)[segment]
    }
    return current
}

/**
 * KTD6 emptiness: `undefined | null | '' | []` are empty; `0`, `false`, `{}`
 * and non-empty arrays/strings are NOT (critical for checkboxes and numbers).
 */
export function isEmptyValue(value: unknown): boolean {
    if (value === undefined || value === null || value === '') return true
    if (Array.isArray(value)) return value.length === 0
    return false
}

/** matchesField — moved verbatim from FormTabs; semantics unchanged. */
export const matchesField = (errorKey: string, field: string) =>
    errorKey === field || errorKey.startsWith(`${field}.`)

const isPlainRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * Compile a single condition into a predicate. `warn` is shared with the whole
 * rule object so a malformed/misused condition warns at most once per object.
 */
function compileCondition(
    cond: Record<string, unknown>,
    warn: (message: string) => void,
): Predicate {
    const field = cond.field as string

    if ('is' in cond) {
        const operand = cond.is
        return (values) => {
            const value = getValueByPath(values, field)
            if (Array.isArray(value)) return false
            return value === operand
        }
    }

    if ('not' in cond) {
        const operand = cond.not
        return (values) => {
            const value = getValueByPath(values, field)
            if (Array.isArray(value)) return true
            return value !== operand
        }
    }

    if ('in' in cond) {
        const operand = cond.in
        if (!Array.isArray(operand)) {
            return () => {
                warn(
                    `${WARN_PREFIX} Rule operator "in" on field "${field}" expects an array operand, ` +
                        `got ${typeof operand}. The condition evaluates to false.`,
                )
                return false
            }
        }
        return (values) => operand.includes(getValueByPath(values, field) as Primitive)
    }

    if ('empty' in cond) {
        const expected = cond.empty
        return (values) => isEmptyValue(getValueByPath(values, field)) === expected
    }

    const numericOps = ['gt', 'gte', 'lt', 'lte'] as const
    for (const op of numericOps) {
        if (op in cond) {
            const operand = cond[op]
            return (values) => {
                const value = getValueByPath(values, field)
                if (!Number.isFinite(value) || !Number.isFinite(operand)) {
                    warn(
                        `${WARN_PREFIX} Rule operator "${op}" on field "${field}" expects finite ` +
                            `numbers on both sides (no string/date coercion). The condition ` +
                            `evaluates to false.`,
                    )
                    return false
                }
                const a = value as number
                const b = operand as number
                if (op === 'gt') return a > b
                if (op === 'gte') return a >= b
                if (op === 'lt') return a < b
                return a <= b
            }
        }
    }

    // `field` present but no recognized operator → malformed.
    return null as unknown as Predicate
}

/**
 * Compile a rule (or combinator) into a predicate. Returns `null` for a
 * structurally malformed node so the caller can apply the fail-open policy.
 */
function compileNode(rule: unknown, warn: (message: string) => void): Predicate | null {
    if (!isPlainRecord(rule)) return null

    if ('and' in rule) {
        const operand = rule.and
        if (!Array.isArray(operand)) return null
        const predicates = operand.map((sub) => compileNode(sub, warn) ?? (() => true))
        return (values) => predicates.every((p) => p(values))
    }

    if ('or' in rule) {
        const operand = rule.or
        if (!Array.isArray(operand)) return null
        const predicates = operand.map((sub) => compileNode(sub, warn) ?? (() => true))
        return (values) => predicates.some((p) => p(values))
    }

    // Combinator `not` is distinguished from condition `{ field, not }` by the
    // absence of a `field` key.
    if ('not' in rule && !('field' in rule)) {
        const inner = compileNode(rule.not, warn)
        if (!inner) return null
        return (values) => !inner(values)
    }

    if ('field' in rule && typeof rule.field === 'string') {
        return compileCondition(rule, warn)
    }

    return null
}

const cache = new WeakMap<object, Predicate>()

/**
 * Compile a `RuleInput` into a predicate `(values) => boolean`.
 *
 * - A function passes through unchanged.
 * - A Rule object is compiled once and memoized in a WeakMap keyed by the
 *   object reference: the same object yields the same predicate instance, a
 *   structurally-equal new object yields a new one.
 * - A malformed rule fails open (predicate returns `true`, keeping the field
 *   visible) and emits a single `[Admiral]`-prefixed warning per rule object.
 */
export function compileRule(input: RuleInput): Predicate {
    if (typeof input === 'function') return input

    const key = input as unknown as object
    if (key !== null && typeof key === 'object') {
        const cached = cache.get(key)
        if (cached) return cached
    }

    let warned = false
    const warn = (message: string) => {
        if (warned) return
        warned = true
        console.warn(message)
    }

    const compiled = compileNode(input, warn)
    const predicate: Predicate =
        compiled ??
        (() => {
            warn(
                `${WARN_PREFIX} Malformed rule ${safeStringify(input)} — it has no recognized ` +
                    `operator. Failing open: the field stays visible. Check the rule shape ` +
                    `against the DSL grammar.`,
            )
            return true
        })

    if (key !== null && typeof key === 'object') cache.set(key, predicate)
    return predicate
}

function safeStringify(value: unknown): string {
    try {
        return JSON.stringify(value)
    } catch {
        return String(value)
    }
}

/**
 * Return a copy of `values` with the given paths removed, copy-on-write:
 * only the container objects/arrays along each removal path are cloned, every
 * untouched branch keeps its original reference (File/Blob values are never
 * cloned). Paths are literal-key-aware — an exact key (e.g. `seo.title`) is
 * removed before any dot-path traversal is attempted. An empty `paths` list
 * returns the original object by reference.
 */
export function omitPaths(values: Values, paths: string[]): Values {
    if (paths.length === 0) return values

    let result = values
    let cloned = false
    const ensureRootClone = () => {
        if (!cloned) {
            result = { ...result }
            cloned = true
        }
    }

    for (const path of paths) {
        // Exact-key removal (literal-key-aware): mirrors getValueByPath priority.
        if (path in result) {
            ensureRootClone()
            delete result[path]
            continue
        }
        const segments = path.split('.')
        const next = omitSegments(result, segments)
        if (next !== result) {
            result = next as Values
            cloned = true
        }
    }

    return result
}

/**
 * Remove `segments` from a container, cloning only along the path. Returns the
 * same reference when the path is absent (nothing to remove).
 */
function omitSegments(container: unknown, segments: string[]): unknown {
    if (container == null || typeof container !== 'object') return container

    const [head, ...rest] = segments
    const isArray = Array.isArray(container)
    const record = container as Record<string, unknown>

    if (rest.length === 0) {
        if (!(head in record)) return container
        if (isArray) {
            const copy = (container as unknown[]).slice()
            delete copy[Number(head)]
            return copy
        }
        const copy = { ...record }
        delete copy[head]
        return copy
    }

    if (!(head in record)) return container
    const child = omitSegments(record[head], rest)
    if (child === record[head]) return container

    if (isArray) {
        const copy = (container as unknown[]).slice()
        copy[Number(head)] = child
        return copy
    }
    const copy = { ...record }
    copy[head] = child
    return copy
}
