import React, { useCallback, useEffect } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Switch } from '@/admiral/ui'
import type { SwitchProps } from '@/admiral/ui/Switch'

interface BooleanInputProps extends SwitchProps {
    name: string
    label?: string
    required?: boolean
}

export const BooleanInput: React.FC<BooleanInputProps> = ({ name, label, ...options }) => {
    const { values, errors, setValues } = useForm()
    const checked = values[name]
    const error = errors[name]?.[0]
    const required = options?.required

    useEffect(() => {
        setValues((values: any) => ({ ...values, [name]: checked ?? false }))
    }, [])

    const onChange = useCallback((checked) => {
        setValues((values: any) => ({ ...values, [name]: checked }))
    }, [])

    return (
        <Form.Item label={label} required={required} error={error}>
            <Switch {...options} checked={checked} onChange={onChange} />
        </Form.Item>
    )
}
