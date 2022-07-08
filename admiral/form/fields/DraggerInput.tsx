import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Upload } from '../../ui'
import { UploadProps } from '../../ui/Upload/interfaces'
import { FormItemProps } from '../Item'

export type DraggerInputProps = FormItemProps & {
    name: string
} & UploadProps

export const DraggerInput: React.FC<DraggerInputProps> = ({
    name,
    label,
    required,
    columnSpan,
    children,
    disabled,
    ...uploadProps
}) => {
    const { values, errors, setValues } = useForm()

    const value = values[name]
    const arrayValue = Array.isArray(value) ? value : value ? [value] : []

    const error = errors[name]?.[0]

    const onChange = useCallback(({ fileList }) => {
        const files = fileList ?? []
        setValues((values: any) => ({ ...values, [name]: files }))
    }, [])

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
            <Upload.Dragger {...uploadProps} fileList={arrayValue} onChange={onChange} />
        </Form.Item>
    )
}
