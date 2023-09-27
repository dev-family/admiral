import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Editor } from '../../ui'
import type { EditorProps } from '../../ui/Editor/interfaces'
import { FormItemProps } from '../Item'
import { InputComponentWithName } from '../interfaces'

export interface EditorInputProps extends EditorProps, FormItemProps {
    name: string
    onChange?: (value: any) => void
}

export const EditorInput: InputComponentWithName<React.FC<EditorInputProps>> = ({
    name,
    label,
    required,
    columnSpan,
    onChange,
    ...editorProps
}) => {
    const { values, errors, setValues, locale: formLocale } = useForm()
    const locale = formLocale.fields.editor

    const value = values[name]
    const error = errors[name]?.[0]

    const _onChange = useCallback(
        (value: string) => {
            setValues((values: any) => ({ ...values, [name]: value }))
            onChange?.(value)
        },
        [onChange],
    )

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <Editor
                {...editorProps}
                value={value}
                locale={locale}
                onChange={_onChange}
                alert={!!error}
            />
        </Form.Item>
    )
}

EditorInput.inputName = 'EditorInput'
