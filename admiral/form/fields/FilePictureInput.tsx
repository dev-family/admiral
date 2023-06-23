import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Upload, Button } from '../../ui'
import { FiUpload } from 'react-icons/fi'
import { UploadProps } from '../../ui/Upload/interfaces'
import { FormItemProps } from '../Item'
import { InputComponentWithName } from '../interfaces'

export type FilePictureInputProps = Omit<FormItemProps, 'isQuickFilter'> & {
    name: string
} & UploadProps

const VALUE_DEFAULT: any[] = []

export const FilePictureInput: InputComponentWithName<React.FC<FilePictureInputProps>> = ({
    name,
    label,
    required,
    columnSpan,
    children,
    disabled,
    maxCount,
    ...uploadProps
}) => {
    const { values, errors, setValues, locale: formLocale } = useForm()
    const locale = formLocale.fields.upload

    let value = values[name]

    const isArrayValue = Array.isArray(value)
    const hasValue = !!value
    const normalizedValue = isArrayValue ? value : hasValue ? [value] : VALUE_DEFAULT

    const error = errors[name]?.[0]

    const onChange = useCallback(
        ({ fileList }) => {
            const firstFile = fileList[0] ?? null
            const value = maxCount === 1 ? firstFile : fileList
            setValues((values: any) => ({ ...values, [name]: value }))
        },
        [maxCount],
    )

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <Upload
                {...uploadProps}
                locale={locale}
                fileList={normalizedValue}
                onChange={onChange}
                maxCount={maxCount}
            >
                <Button type="button" disabled={disabled} iconLeft={<FiUpload />}>
                    {children || 'Upload'}
                </Button>
            </Upload>
        </Form.Item>
    )
}

FilePictureInput.inputName = 'FilePictureInput'
