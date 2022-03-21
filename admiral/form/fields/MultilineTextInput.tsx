import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Textarea } from '@/admiral/ui'
import type { TextareaProps } from '@/admiral/ui/Textarea/interfaces'
import { ItemProps } from '../Item'

interface MultilineTextInputProps extends TextareaProps, ItemProps {
    name: string
}

export const MultilineTextInput: React.FC<MultilineTextInputProps> = (props) => {
    const { name, label, required, ...options } = props
    const { values, errors, setValues } = useForm()
    const value = values[name]
    const error = errors[name]?.[0]

    const onChange = useCallback((e) => {
        setValues((values: any) => ({ ...values, [name]: e.target.value }))
    }, [])

    return (
        <Form.Item label={label} required={required} error={error}>
            <Textarea {...options} name={name} value={value} onChange={onChange} alert={!!error} />
        </Form.Item>
    )
}
