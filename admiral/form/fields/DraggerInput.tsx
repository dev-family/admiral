import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Upload } from '../../ui'
import { UploadProps } from '../../ui/Upload/interfaces'
import { FormItemProps } from '../Item'
import { InputComponentWithName } from '../interfaces'
import { FieldRuleProps, withFieldRules } from '../fieldRules'

export type DraggerInputProps = FormItemProps &
    Omit<FieldRuleProps, 'disabledWhen'> & {
        name: string
        onChange?: (value: any) => void
    } & UploadProps

const DraggerInputBase: InputComponentWithName<(props: DraggerInputProps) => React.JSX.Element> =
    function DraggerInput({
        name,
        label,
        required,
        columnSpan,
        children: _children,
        disabled: _disabled,
        onChange,
        ...uploadProps
    }: DraggerInputProps) {
        const { values, errors, setValues, locale: formLocale } = useForm()
        const locale = formLocale.fields.upload

        const value = values[name]
        const arrayValue = Array.isArray(value) ? value : value ? [value] : []

        const error = errors[name]?.[0]

        const _onChange = useCallback(
            ({ fileList }: { fileList: any }) => {
                const files = fileList ?? []
                setValues((values: any) => ({ ...values, [name]: files }))
                onChange?.(files)
            },
            [name, onChange],
        )

        const onLabelClick = useCallback((e: any) => {
            e?.preventDefault()
        }, [])

        return (
            <Form.Item
                label={label}
                onLabelClick={onLabelClick}
                required={required}
                error={error}
                columnSpan={columnSpan}
            >
                <Upload.Dragger
                    {...uploadProps}
                    locale={locale}
                    fileList={arrayValue}
                    onChange={_onChange}
                />
            </Form.Item>
        )
    }

DraggerInputBase.inputName = 'DraggerInput'

export const DraggerInput = withFieldRules(DraggerInputBase, { supportsDisabled: false })
