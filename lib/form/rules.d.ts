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
export type Primitive = string | number | boolean | null;
export type Condition = {
    field: string;
    is: Primitive;
} | {
    field: string;
    not: Primitive;
} | {
    field: string;
    in: Primitive[];
} | {
    field: string;
    empty: boolean;
} | {
    field: string;
    gt: number;
} | {
    field: string;
    gte: number;
} | {
    field: string;
    lt: number;
} | {
    field: string;
    lte: number;
};
export type Rule = Condition | {
    and: Rule[];
} | {
    or: Rule[];
} | {
    not: Rule;
};
/** A rule is either the serializable DSL or an arbitrary predicate over scope values. */
export type RuleInput = Rule | ((values: Record<string, unknown>) => boolean);
/** Per-field rule block — the format of the Form `rules` prop and the future server block. */
export type FieldRules = {
    visible?: RuleInput;
    disabled?: RuleInput;
    required?: RuleInput;
};
/** Map of root scope key → its rule block. */
export type FormRulesMap = Record<string, FieldRules>;
type Values = Record<string, unknown>;
type Predicate = (values: Values) => boolean;
/**
 * Resolve a field reference against a values scope. The exact key is tried
 * first (so a flat key like `seo.title` or a numeric-looking key resolves
 * before traversal); otherwise the path is split on `.` and walked, with
 * numeric segments indexing arrays. Any undefined/null intermediate short-
 * circuits to `undefined` rather than throwing.
 */
export declare function getValueByPath(values: Values, path: string): unknown;
/**
 * KTD6 emptiness: `undefined | null | '' | []` are empty; `0`, `false`, `{}`
 * and non-empty arrays/strings are NOT (critical for checkboxes and numbers).
 */
export declare function isEmptyValue(value: unknown): boolean;
/** matchesField — moved verbatim from FormTabs; semantics unchanged. */
export declare const matchesField: (errorKey: string, field: string) => boolean;
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
export declare function compileRule(input: RuleInput): Predicate;
/**
 * Return a copy of `values` with the given paths removed, copy-on-write:
 * only the container objects/arrays along each removal path are cloned, every
 * untouched branch keeps its original reference (File/Blob values are never
 * cloned). Paths are literal-key-aware — an exact key (e.g. `seo.title`) is
 * removed before any dot-path traversal is attempted. An empty `paths` list
 * returns the original object by reference.
 */
export declare function omitPaths(values: Values, paths: string[]): Values;
export {};
