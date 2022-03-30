import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Upload, Button } from '../../ui'
import { FiUpload } from 'react-icons/fi'
import { UploadProps } from '../../ui/Upload/interfaces'
import { FormItemProps } from '../Item'

export type FilePictureInputProps = FormItemProps & {
    name: string
} & UploadProps

export const FilePictureInput: React.FC<FilePictureInputProps> = ({
    name,
    label,
    required,
    columnSpan,
    children,
    disabled,
    ...uploadProps
}) => {
    const { values, errors, setValues } = useForm()

    let value = values[name] ? [values[name]] : []
    const error = errors[name]?.[0]

    const onChange = useCallback(({ fileList }) => {
        const file = fileList[0] ?? null
        setValues((values: any) => ({ ...values, [name]: file }))
    }, [])

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <Upload {...uploadProps} fileList={value} onChange={onChange} maxCount={1}>
                <Button type="button" disabled={disabled} iconLeft={<FiUpload />}>
                    {children || 'Upload'}
                </Button>
            </Upload>
        </Form.Item>
    )
}
