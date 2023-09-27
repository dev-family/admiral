import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Switch } from '../../ui'
import type { SwitchProps } from '../../ui/Switch/interfaces'
import { FormItemProps } from '../Item'
import { InputComponentWithName } from '../interfaces'

export interface BooleanInputProps extends SwitchProps, FormItemProps {
    name: string
    onChange?: (value: boolean) => void
}

export const BooleanInput: InputComponentWithName<React.FC<BooleanInputProps>> = ({
    name,
    label,
    required,
    columnSpan,
    onChange,
    ...switchProps
}) => {
    const { values, errors, setValues } = useForm()
    const checked = values[name]
    const error = errors[name]?.[0]

    const _onChange = useCallback(
        (checked: boolean) => {
            setValues((values: any) => ({ ...values, [name]: checked }))
            onChange?.(checked)
        },
        [onChange],
    )

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <Switch {...switchProps} checked={checked} onChange={_onChange} />
        </Form.Item>
    )
}

BooleanInput.inputName = 'BooleanInput'
