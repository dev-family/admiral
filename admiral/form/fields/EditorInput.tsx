import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Editor } from '../../ui'
import type { EditorProps } from '../../ui/Editor/interfaces'
import { FormItemProps } from '../Item'

export interface EditorInputProps extends EditorProps, FormItemProps {
    name: string
}

export const EditorInput: React.FC<EditorInputProps> = ({
    name,
    label,
    required,
    columnSpan,
    ...editorProps
}) => {
    const { values, errors, setValues } = useForm()
    const value = values[name]
    const error = errors[name]?.[0]

    const onChange = useCallback((value: string) => {
        setValues((values: any) => ({ ...values, [name]: value }))
    }, [])

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <Editor {...editorProps} value={value} onChange={onChange} alert={!!error} />
        </Form.Item>
    )
}
