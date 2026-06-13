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
import React from 'react';
import { type FormRulesMap, type RuleInput } from './rules.js';
type Values = Record<string, unknown>;
/**
 * A single discovered node of the scan. The tree is value-independent: branches
 * that depend on values (Form.When, ArrayInput rows) keep the data needed to
 * resolve them later (`rule`, `children`) rather than a decision.
 */
export type ScanNode = FieldNode | WhenNode | ArrayNode | TranslatableNode;
/** A leaf field (or any input with rule props): TextInput, SelectInput, … */
export type FieldNode = {
    kind: 'field';
    /** Field name as written on the element (un-prefixed). */
    name: string;
    /** JSX `visibleWhen` if present — wins over the rules-map `visible`. */
    visibleWhen?: RuleInput;
    /** Present only to count toward `hasRules`; never affects hidden paths. */
    hasDisabledWhen: boolean;
    hasRequiredWhen: boolean;
    /** `keepInPayload` opts the field's value out of omission even when hidden. */
    keepInPayload: boolean;
};
/** A Form.When group: its rule gates every node inside. */
export type WhenNode = {
    kind: 'when';
    rule: RuleInput;
    children: ScanNode[];
};
/**
 * An ArrayInput. Rows are value-dependent, so the row template is captured
 * unresolved: at eval time it is resolved per index against the row scope.
 */
export type ArrayNode = {
    kind: 'array';
    name: string;
    /** Rule props on the ArrayInput element itself hide the whole `name`. */
    visibleWhen?: RuleInput;
    hasDisabledWhen: boolean;
    hasRequiredWhen: boolean;
    keepInPayload: boolean;
    /** The row template — node or `(rowValues, idx) => node`. */
    rowTemplate: React.ReactNode | ((item: Values, idx: number) => React.ReactNode);
    /** A pre-scan of a static (non-function) template, reused for every row. */
    staticRowScan?: ScanNode[];
};
/** A TranslatableInput: scoped `{ [lang]: value }`; inner rule props are ignored by design. */
export type TranslatableNode = {
    kind: 'translatable';
    name: string;
    languages: string[];
    visibleWhen?: RuleInput;
    hasDisabledWhen: boolean;
    hasRequiredWhen: boolean;
    keepInPayload: boolean;
};
/** The output of the structural scan — memoizable by `[children, rulesMap]` upstream. */
export type FormScan = {
    nodes: ScanNode[];
    rulesMap?: FormRulesMap;
    /** True if any rule prop / Form.When / non-empty rulesMap was found (R18 fast-path). */
    hasRules: boolean;
};
/**
 * Walk `children` and build the scan tree. Pure structural pass — no values.
 * `hasRules` is accumulated through a mutable flag carried in the walk.
 */
export declare function scanFormChildren(children: React.ReactNode, rulesMap?: FormRulesMap): FormScan;
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
export declare function evaluateVisibility(scan: FormScan, values: Values): {
    hiddenPaths: Set<string>;
    scannedPaths: Set<string>;
    keepPaths: Set<string>;
    hasRules: boolean;
};
/**
 * Deny-list omit (R16): omit (`hiddenPaths` − `keepInPayload`) from `values`
 * via U1's `omitPaths`. Any key the scan never saw passes through untouched,
 * and untouched branches keep reference identity (guaranteed by `omitPaths`).
 */
export declare function omitHiddenValues(values: Values, hiddenPaths: Set<string>, keepInPayload: Set<string>): Values;
export {};
