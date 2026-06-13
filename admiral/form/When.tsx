import React from 'react'
import { useForm } from './FormContext'
import { compileRule, RuleInput } from './rules'

export type FormWhenProps = {
    rule: RuleInput
    children?: React.ReactNode
}

/**
 * Conditionally renders a group of fields by a single rule, computed against
 * the form's current `values`.
 *
 * Visible → a Fragment (NOT a wrapper element: fields live in the `Form.Fields`
 * CSS grid and any wrapper DOM node would break the column layout). Hidden →
 * `null`, a full unmount — children's internal state resets, but their values
 * persist in the form context (the U1/U4 contract; nothing for When to do).
 *
 * Nested `<Form.When>` combine as AND naturally: an outer hidden When returns
 * null, so the inner one never renders.
 *
 * The static `formNodeType = 'when'` marker lets the form's structural scan
 * recognize the node by string marker (never by component reference).
 */
type FormWhenComponent = ((props: FormWhenProps) => React.JSX.Element | null) & {
    formNodeType: 'when'
    displayName?: string
}

const When: FormWhenComponent = function When({ rule, children }: FormWhenProps) {
    const { values } = useForm()
    const visible = compileRule(rule)(values)
    return visible ? <>{children}</> : null
}

When.formNodeType = 'when'
When.displayName = 'Form.When'

export default When
