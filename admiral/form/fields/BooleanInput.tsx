import React, { useCallback, useEffect } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Switch } from '@/admiral/ui'
import type { SwitchProps } from '@/admiral/ui/Switch/interfaces'
import { FormItemProps } from '../Item'

export interface BooleanInputProps extends SwitchProps, FormItemProps {
    name: string
}

export const BooleanInput: React.FC<BooleanInputProps> = ({
    name,
    label,
    required,
    columnSpan,
    ...switchProps
}) => {
    const { values, errors, setValues } = useForm()
    const checked = values[name]
    const error = errors[name]?.[0]

    useEffect(() => {
        setValues((values: any) => ({ ...values, [name]: checked ?? false }))
    }, [])

    const onChange = useCallback((checked) => {
        setValues((values: any) => ({ ...values, [name]: checked }))
    }, [])

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <Switch {...switchProps} checked={checked} onChange={onChange} />
        </Form.Item>
    )
}
