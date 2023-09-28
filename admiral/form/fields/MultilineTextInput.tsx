import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Textarea } from '../../ui'
import type { TextareaProps } from '../../ui/Textarea/interfaces'
import { FormItemProps } from '../Item'
import { InputComponentWithName } from '../interfaces'

export interface MultilineTextInputProps extends TextareaProps, FormItemProps {
    name: string
    onChange?: (value: any) => void
}

export const MultilineTextInput: InputComponentWithName<React.FC<MultilineTextInputProps>> = ({
    name,
    label,
    required,
    columnSpan,
    onChange,
    ...textareaProps
}) => {
    const { values, errors, setValues } = useForm()
    const value = values[name]
    const error = errors[name]?.[0]

    const _onChange = useCallback(
        (e) => {
            setValues((values: any) => ({ ...values, [name]: e.target.value }))
            onChange?.(e.target.value)
        },
        [onChange],
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

MultilineTextInput.inputName = 'MultilineTextInput'
