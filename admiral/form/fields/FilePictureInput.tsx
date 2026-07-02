import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Upload, Button } from '../../ui'
import { FiUpload } from 'react-icons/fi'
import { UploadChangeParam, UploadFile, UploadProps } from '../../ui/Upload/interfaces'
import { FormItemProps } from '../Item'
import { InputComponentWithName } from '../interfaces'
import { FieldRuleProps, withFieldRules } from '../fieldRules'

export type FilePictureInputProps = FormItemProps &
    FieldRuleProps & {
        name: string
    } & UploadProps

const VALUE_DEFAULT: any[] = []

const FilePictureInputBase: InputComponentWithName<
    (props: FilePictureInputProps) => React.JSX.Element
> = function FilePictureInput({
    name,
    label,
    required,
    columnSpan,
    children,
    disabled,
    maxCount,
    ...uploadProps
}: FilePictureInputProps) {
    const { values, errors, setValues, locale: formLocale } = useForm()
    const locale = formLocale.fields.upload
    const value = values[name]

    const isArrayValue = Array.isArray(value)
    const hasValue = !!value
    const normalizedValue = isArrayValue ? value : hasValue ? [value] : VALUE_DEFAULT

    const error = errors[name]?.[0]

    const onChange = useCallback(
        (uploadFile: UploadChangeParam<UploadFile>) => {
            const { fileList } = uploadFile

            const firstFile = fileList[0] ?? null
            const value = maxCount === 1 ? firstFile : fileList
            setValues((values: any) => ({ ...values, [name]: value }))

            uploadProps.onChange?.(uploadFile)
        },
        [maxCount, uploadProps.onChange],
    )

    // prevent the implicit <label> from forwarding clicks on the empty
    // form-item area to the hidden file input (opens the file dialog)
    const onLabelClick = useCallback((e: React.MouseEvent<HTMLLabelElement>) => {
        e.preventDefault()
    }, [])

    return (
        <Form.Item
            label={label}
            onLabelClick={onLabelClick}
            required={required}
            error={error}
            columnSpan={columnSpan}
        >
            <Upload
                {...uploadProps}
                locale={locale}
                fileList={normalizedValue}
                onChange={onChange}
                maxCount={maxCount}
                disabled={disabled}
            >
                <Button type="button" disabled={disabled} iconLeft={<FiUpload />}>
                    {children || locale?.pictureCardUpload}
                </Button>
            </Upload>
        </Form.Item>
    )
}

FilePictureInputBase.inputName = 'FilePictureInput'

export const FilePictureInput = withFieldRules(FilePictureInputBase, { dispatchesChange: false })
