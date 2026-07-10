import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { RadioGroup } from '../../ui'
import { FormItemProps } from '../Item'
import type { RadioGroupProps } from '../../ui/Radio/interfaces'
import { InputComponentWithName } from '../interfaces'
import { FieldRuleProps, withFieldRules } from '../fieldRules'

export interface RadioInputProps extends RadioGroupProps, FormItemProps, FieldRuleProps {
    name: string
    onChange?: (value: any) => void
}

const RadioInputBase: InputComponentWithName<(props: RadioInputProps) => React.JSX.Element> =
    function RadioInput({
        name,
        label,
        required,
        columnSpan,
        onChange,
        ...inputProps
    }: RadioInputProps) {
        const { values, errors, options, setValues } = useForm()
        const value = values[name]
        const error = errors[name]?.[0]
        const opts = options[name]

        const _onChange = useCallback<NonNullable<RadioGroupProps['onChange']>>(
            (e) => {
                setValues((values: Record<string, any>) => ({ ...values, [name]: e.target.value }))
                onChange?.(e.target.value)
            },
            [name, onChange, setValues],
        )

        return (
            <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
                <RadioGroup
                    options={opts}
                    {...inputProps}
                    name={name}
                    value={value}
                    onChange={_onChange}
                />
            </Form.Item>
        )
    }

RadioInputBase.inputName = 'RadioInput'

export const RadioInput = withFieldRules(RadioInputBase)
