/**
 * Render-side of the rules layer (U5): the public `useFieldRules` hook and the
 * `withFieldRules` HOC that wraps every built-in field.
 *
 * `useFieldRules` resolves a field's effective visible / disabled / required
 * from its JSX rule props and the Form `rules` map (KTD3 priority + KTD4
 * restrictive-wins composition). `withFieldRules` applies that to a component:
 * a hidden field returns `null` (full unmount, value persists in form context),
 * rule props are stripped before they reach the inner control, `disabled` /
 * `required` are injected, and `onChange` is wrapped to notify the cascade bus
 * (KTD9). All component statics (`inputName`, `SelectInput.Option`, …) are
 * hoisted so existing scanners and consumers keep working.
 */
import React from 'react';
import { type RuleInput } from './rules.js';
export type FieldRuleProps = {
    visibleWhen?: RuleInput;
    disabledWhen?: RuleInput;
    requiredWhen?: RuleInput;
    keepInPayload?: boolean;
};
export type FieldRulesState = {
    hidden: boolean;
    disabled: boolean;
    required: boolean;
};
/**
 * Resolve a field's effective visible / disabled / required from its JSX rule
 * props and the Form `rules` map. Exported so custom fields can opt into the
 * same semantics as the built-ins.
 *
 * - Source priority (KTD3): a JSX rule prop wins over the same dimension in the
 *   rules map; if both are present they do not AND — JSX wins and a single
 *   warn-once-per-field is emitted.
 * - `hidden`: effective `visible` rule is false (no rule → never hidden here;
 *   an enclosing `Form.When` is a separate unmount and not this hook's concern).
 * - `disabled` (KTD4 OR-merge): static `disabled` OR the effective rule.
 * - `required` (KTD4): the effective `requiredWhen` rule when present (static
 *   `required` is ignored), else the static `required`.
 */
export declare function useFieldRules(name: string, props: FieldRuleProps & {
    disabled?: boolean;
    required?: boolean;
}): FieldRulesState;
export type WithFieldRulesOptions = {
    /** The field forwards `disabled`; false for fields whose disabled is non-prop state. */
    supportsDisabled?: boolean;
    /** The field accepts `requiredWhen`; false for fields with structural required. */
    supportsRequiredWhen?: boolean;
    /** The field has a value-bearing `onChange` worth dispatching to the bus. */
    dispatchesChange?: boolean;
};
/**
 * Minimal constraint every wrapped field satisfies: a `name` plus the optional
 * rule props. `disabled` / `required` / `onChange` are intentionally NOT part of
 * the constraint — their per-field signatures differ (e.g. DateRangePicker's
 * `onChange` carries `[value, formatString]`), and including them would make
 * inference fall back to the constraint and drop the field's own props type.
 * They are read inside the wrapper via a loose cast instead.
 */
type FieldComponentProps = FieldRuleProps & {
    name: string;
};
/**
 * Wrap a field component with the rules layer. The wrapper:
 * - hides → returns `null` (full unmount; children state resets, value persists);
 * - strips all four rule props before forwarding (they must not reach the DOM);
 * - injects the computed `disabled` / `required` (only the supported ones);
 * - wraps `onChange` to notify the cascade bus on a real value change (KTD9);
 * - hoists every static of the wrapped component + sets a `displayName`.
 *
 * Options default to all-true (the common leaf-field case). Unsupported rule
 * props passed by a consumer trigger a runtime warn-once (KTD11). The return
 * preserves the component's own props type `P` (a function component, not the
 * `ComponentType` union) so call-site prop checks and `SelectInput.Option`-style
 * statics survive the wrap.
 */
export declare function withFieldRules<P extends FieldComponentProps>(Component: React.ComponentType<P>, options?: WithFieldRulesOptions): (props: P) => React.JSX.Element | null;
export {};
