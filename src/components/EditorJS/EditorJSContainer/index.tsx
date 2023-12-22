import React, { memo, useCallback } from 'react'
import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs'
import { Form, FormItemProps, useForm } from '../../../../admiral'
import '../editor.scss'
import EditorJSInput from '../EditorJSField'

type UploadResponseFormat = { success: 1 | 0; file: { url: string } }

interface EditorProps extends Omit<EditorConfig, 'onChange' | 'holder'> {
    isFetching: boolean
    value: OutputData
    holder?: string
    imageUploadUrl?: string
    imageUploadField?: string
    onImageUpload?: (file: Blob) => Promise<UploadResponseFormat>
    onChange: (value: OutputData) => void
}

type Props = Partial<Omit<EditorProps, 'value'>> & FormItemProps & { name: string }

function EditorJSContainer({ name, label, required, columnSpan, ...rest }: Props) {
    const { values, errors, isFetching, setValues } = useForm()

    const value = values[name]
    const error = errors[name]?.[0]

    const onChange = (value: OutputData) => {
        setValues((values: any) => ({ ...values, [name]: value }))
    }

    // prevent reopen when close picker by clicking on label
    const onLabelClick = useCallback((e) => {
        e?.preventDefault()
    }, [])

    return (
        <Form.Item
            label={label}
            required={required}
            error={error}
            columnSpan={columnSpan}
            onLabelClick={onLabelClick}
        >
            <EditorJSInput value={value} onChange={onChange} isFetching={isFetching} {...rest} />
        </Form.Item>
    )
}

export default memo(EditorJSContainer)
