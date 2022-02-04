import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Input } from '@/admiral/ui'
import type { InputProps } from '@/admiral/ui/Input/interfaces'

interface TextInputProps extends InputProps {
    name: string
    label?: string
}

export const TextInput: React.FC<TextInputProps> = ({ name, label, ...options }) => {
    const { values, errors, setValues } = useForm()
    const value = values[name]
    const error = errors[name]?.[0]
    const required = options?.required

    const onChange = useCallback((e) => {
        setValues((values: any) => ({ ...values, [name]: e.target.value }))
    }, [])

    return (
        <Form.Item label={label} required={required} error={error}>
            <Input {...options} name={name} value={value} onChange={onChange} alert={!!error} />
        </Form.Item>
    )
}
