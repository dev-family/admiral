import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Textarea } from '../../ui'
import type { TextareaProps } from '../../ui/Textarea/interfaces'
import { FormItemProps } from '../Item'

export interface MultilineTextInputProps extends TextareaProps, FormItemProps {
    name: string
}

export const MultilineTextInput: React.FC<MultilineTextInputProps> = ({
    name,
    label,
    required,
    columnSpan,
    ...textareaProps
}) => {
    const { values, errors, setValues } = useForm()
    const value = values[name]
    const error = errors[name]?.[0]

    const onChange = useCallback((e) => {
        setValues((values: any) => ({ ...values, [name]: e.target.value }))
    }, [])

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <Textarea
                {...textareaProps}
                name={name}
                value={value}
                onChange={onChange}
                alert={!!error}
            />
        </Form.Item>
    )
}
