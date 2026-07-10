import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Editor } from '../../ui/Editor'
import type { EditorProps } from '../../ui/Editor/interfaces'
import { FormItemProps } from '../Item'
import { InputComponentWithName } from '../interfaces'
import { FieldRuleProps, withFieldRules } from '../fieldRules'

export interface EditorInputProps extends EditorProps, FormItemProps, FieldRuleProps {
    name: string
    onChange?: (value: any) => void
}

const EditorInputBase: InputComponentWithName<(props: EditorInputProps) => React.JSX.Element> =
    function EditorInput({
        name,
        label,
        required,
        columnSpan,
        onChange,
        ...editorProps
    }: EditorInputProps) {
        const { values, errors, setValues, locale: formLocale } = useForm()
        const locale = formLocale.fields.editor

        const value = values[name]
        const error = errors[name]?.[0]

        const _onChange = useCallback(
            (value: string) => {
                setValues((values: any) => ({ ...values, [name]: value }))
                onChange?.(value)
            },
            [name, onChange],
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

EditorInputBase.inputName = 'EditorInput'

export const EditorInput = withFieldRules(EditorInputBase)
