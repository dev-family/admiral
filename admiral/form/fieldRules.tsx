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
import React from 'react'
import { useForm } from './FormContext'
import { compileRule, getValueByPath, type Rule, type RuleInput } from './rules'

const WARN_PREFIX = '[Admiral]'

export type FieldRuleProps = {
    visibleWhen?: RuleInput
    disabledWhen?: RuleInput
    requiredWhen?: RuleInput
    keepInPayload?: boolean
}

/** The four rule-prop keys, stripped from the props forwarded to the inner control. */
const RULE_PROP_KEYS = ['visibleWhen', 'disabledWhen', 'requiredWhen', 'keepInPayload'] as const

const joinPath = (scope: string, name: string) => (scope ? `${scope}.${name}` : name)

/**
 * Warn-once-per-field registry. Keys are `${reason}::${fullPath}` so each
 * distinct warning fires at most once per field path across re-renders — under
 * a future server-rules merge a per-render warn would be noise (KTD3).
 */
const warnedKeys = new Set<string>()

function warnOnce(reason: string, fullPath: string, message: string) {
    const key = `${reason}::${fullPath}`
    if (warnedKeys.has(key)) return
    warnedKeys.add(key)
    console.warn(message)
}

/** True when `rule` is a DSL condition whose `field` equals `name` (self-reference). */
function referencesSelf(rule: RuleInput | undefined, name: string): boolean {
    if (rule === undefined || typeof rule === 'function') return false
    return dslReferencesField(rule, name)
}

function dslReferencesField(rule: Rule, name: string): boolean {
    if (typeof rule !== 'object' || rule === null) return false
    if ('field' in rule) return rule.field === name
    if ('and' in rule && Array.isArray(rule.and))
        return rule.and.some((sub) => dslReferencesField(sub, name))
    if ('or' in rule && Array.isArray(rule.or))
        return rule.or.some((sub) => dslReferencesField(sub, name))
    if ('not' in rule) return dslReferencesField(rule.not as Rule, name)
    return false
}

export type FieldRulesState = { hidden: boolean; disabled: boolean; required: boolean }

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
export function useFieldRules(
    name: string,
    props: FieldRuleProps & { disabled?: boolean; required?: boolean },
): FieldRulesState {
    const { values, scopePath = '', rules, scannedFields } = useForm()
    const fullPath = joinPath(scopePath, name)

    const { visibleWhen, disabledWhen, requiredWhen } = props
    const mapRules = rules?.[fullPath]

    // KTD3 conflict warn (once per field): a JSX rule prop and a map rule both
    // target the same field + dimension. JSX wins; the map entry is ignored.
    const conflicts =
        (visibleWhen !== undefined && mapRules?.visible !== undefined) ||
        (disabledWhen !== undefined && mapRules?.disabled !== undefined) ||
        (requiredWhen !== undefined && mapRules?.required !== undefined)
    if (conflicts) {
        warnOnce(
            'conflict',
            fullPath,
            `${WARN_PREFIX} Field "${fullPath}" has both a JSX rule prop and a Form \`rules\` ` +
                `map entry for the same dimension. The JSX prop wins and the map entry is ` +
                `ignored. Define the rule in one place.`,
        )
    }

    // Self-reference warn (once per field): a rule reading the field's own value.
    if (
        referencesSelf(visibleWhen, name) ||
        referencesSelf(disabledWhen, name) ||
        referencesSelf(requiredWhen, name)
    ) {
        warnOnce(
            'self',
            fullPath,
            `${WARN_PREFIX} A rule on field "${fullPath}" references its own value ("${name}"). ` +
                `A field's rule should depend on other fields; this likely is a mistake.`,
        )
    }

    // Scan-invisibility warn (KTD10, once per field): the field carries a JSX
    // rule prop but the static scan never saw its path — the scan can't omit it
    // from the payload, so the rule should move to the Form `rules` map.
    const hasJsxRule =
        visibleWhen !== undefined || disabledWhen !== undefined || requiredWhen !== undefined
    if (hasJsxRule && scannedFields !== undefined && !scannedFields.has(fullPath)) {
        warnOnce(
            'scan',
            fullPath,
            `${WARN_PREFIX} Field "${fullPath}" has a JSX rule prop but the form's static scan ` +
                `did not discover it (it is likely rendered inside a custom component the scan ` +
                `cannot inspect). Its value will NOT be omitted from the payload when hidden. ` +
                `Move the rule into the Form \`rules\` map so the scan can see it.`,
        )
    }

    const effectiveVisible = visibleWhen ?? mapRules?.visible
    const hidden = effectiveVisible !== undefined ? !compileRule(effectiveVisible)(values) : false

    const effectiveDisabledRule = disabledWhen ?? mapRules?.disabled
    const disabled =
        !!props.disabled ||
        (effectiveDisabledRule !== undefined ? compileRule(effectiveDisabledRule)(values) : false)

    const effectiveRequiredRule = requiredWhen ?? mapRules?.required
    const required =
        effectiveRequiredRule !== undefined
            ? compileRule(effectiveRequiredRule)(values)
            : !!props.required

    return { hidden, disabled, required }
}

/**
 * Reference equality with element-wise comparison for arrays — used to suppress
 * a cascade `notify` when the new value is identical to the current one (KTD9).
 */
function valuesEqual(a: unknown, b: unknown): boolean {
    if (Object.is(a, b)) return true
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false
        return a.every((item, i) => Object.is(item, b[i]))
    }
    return false
}

export type WithFieldRulesOptions = {
    /** The field forwards `disabled`; false for fields whose disabled is non-prop state. */
    supportsDisabled?: boolean
    /** The field accepts `requiredWhen`; false for fields with structural required. */
    supportsRequiredWhen?: boolean
    /** The field has a value-bearing `onChange` worth dispatching to the bus. */
    dispatchesChange?: boolean
}

/**
 * Minimal constraint every wrapped field satisfies: a `name` plus the optional
 * rule props. `disabled` / `required` / `onChange` are intentionally NOT part of
 * the constraint — their per-field signatures differ (e.g. DateRangePicker's
 * `onChange` carries `[value, formatString]`), and including them would make
 * inference fall back to the constraint and drop the field's own props type.
 * They are read inside the wrapper via a loose cast instead.
 */
type FieldComponentProps = FieldRuleProps & { name: string }

type FieldComponentExtras = {
    disabled?: boolean
    required?: boolean
    onChange?: (value: any) => void
}

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
export function withFieldRules<P extends FieldComponentProps>(
    Component: React.ComponentType<P>,
    options: WithFieldRulesOptions = {},
): (props: P) => React.JSX.Element | null {
    const {
        supportsDisabled = true,
        supportsRequiredWhen = true,
        dispatchesChange = true,
    } = options

    const Wrapped = function FieldWithRules(props: P) {
        const { values, scopePath = '', fieldChange } = useForm()
        const { hidden, disabled, required } = useFieldRules(props.name, props)
        const fullPath = joinPath(scopePath, props.name)
        const extras = props as FieldComponentExtras

        // Excluded-prop runtime warns (KTD11): a rule prop the field cannot honor.
        if (!supportsDisabled && props.disabledWhen !== undefined) {
            warnOnce(
                'unsupported-disabled',
                fullPath,
                `${WARN_PREFIX} \`disabledWhen\` is not supported on "${fullPath}" and is ignored.`,
            )
        }
        if (!supportsRequiredWhen && props.requiredWhen !== undefined) {
            warnOnce(
                'unsupported-required',
                fullPath,
                `${WARN_PREFIX} \`requiredWhen\` is not supported on "${fullPath}" and is ignored.`,
            )
        }

        if (hidden) return null

        // Strip rule props; everything else is forwarded to the inner component.
        const rest = { ...props } as Record<string, unknown>
        for (const key of RULE_PROP_KEYS) delete rest[key]

        if (supportsDisabled) rest.disabled = disabled
        if (supportsRequiredWhen) rest.required = required

        if (dispatchesChange) {
            const originalOnChange = extras.onChange
            rest.onChange = (value: unknown) => {
                originalOnChange?.(value)
                const current = getValueByPath(values, fullPath)
                if (!valuesEqual(value, current)) {
                    fieldChange?.notify({ path: fullPath, value })
                }
            }
        }

        return <Component {...(rest as unknown as P)} />
    }

    // Hoist ALL own statics (inputName, SelectInput.Option/OptGroup, …) so the
    // CRUD-filter scanner, Form.Tabs and consumers see the same surface.
    Object.assign(Wrapped, Component)
    Wrapped.displayName = `withFieldRules(${
        (Component as { displayName?: string; name?: string }).displayName ||
        Component.name ||
        'Field'
    })`

    return Wrapped as (props: P) => React.JSX.Element | null
}
