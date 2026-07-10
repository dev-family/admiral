import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Textarea } from '../../ui'
import type { TextareaProps } from '../../ui/Textarea/interfaces'
import { FormItemProps } from '../Item'
import { InputComponentWithName } from '../interfaces'
import { FieldRuleProps, withFieldRules } from '../fieldRules'

export interface MultilineTextInputProps
    extends Omit<TextareaProps, 'onChange'>, FormItemProps, FieldRuleProps {
    name: string
    onChange?: (value: string) => void
}

const MultilineTextInputBase: InputComponentWithName<
    (props: MultilineTextInputProps) => React.JSX.Element
> = function MultilineTextInput({
    name,
    label,
    required,
    columnSpan,
    onChange,
    ...textareaProps
}: MultilineTextInputProps) {
    const { values, errors, setValues } = useForm()
    const value = values[name]
    const error = errors[name]?.[0]

    const _onChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setValues((values: Record<string, any>) => ({ ...values, [name]: e.target.value }))
            onChange?.(e.target.value)
        },
        [name, onChange, setValues],
    )

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <Textarea
                {...textareaProps}
                name={name}
                value={value}
                onChange={_onChange}
                alert={!!error}
            />
        </Form.Item>
    )
}

MultilineTextInputBase.inputName = 'MultilineTextInput'

export const MultilineTextInput = withFieldRules(MultilineTextInputBase)
