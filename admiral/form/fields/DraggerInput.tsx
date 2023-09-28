import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Upload } from '../../ui'
import { UploadProps } from '../../ui/Upload/interfaces'
import { FormItemProps } from '../Item'
import { InputComponentWithName } from '../interfaces'

export type DraggerInputProps = FormItemProps & {
    name: string
    onChange?: (value: any) => void
} & UploadProps

export const DraggerInput: InputComponentWithName<React.FC<DraggerInputProps>> = ({
    name,
    label,
    required,
    columnSpan,
    children,
    disabled,
    onChange,
    ...uploadProps
}) => {
    const { values, errors, setValues, locale: formLocale } = useForm()
    const locale = formLocale.fields.upload

    const value = values[name]
    const arrayValue = Array.isArray(value) ? value : value ? [value] : []

    const error = errors[name]?.[0]

    const _onChange = useCallback(
        ({ fileList }) => {
            const files = fileList ?? []
            setValues((values: any) => ({ ...values, [name]: files }))
            onChange?.(files)
        },
        [onChange],
    )

    const onLabelClick = useCallback((e) => {
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

DraggerInput.inputName = 'DraggerInput'
