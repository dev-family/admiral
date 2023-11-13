import React, { useEffect, useRef } from 'react'
import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs'
import styles from './EditorJSField.module.scss'
import '../editor.scss'

import { EDITOR_TOOLS } from './EditorTools'

const defaultHolder = 'editorjs-container'

type UploadResponseFormat = { success: 1 | 0; file: { url: string } }

interface EditorProps extends Omit<EditorConfig, 'onChange' | 'holder'> {
    isFetching: boolean
    value: OutputData
    onChange: (value: OutputData) => void
    onImageUpload?: (file: Blob) => Promise<UploadResponseFormat>
    holder?: string
    imageUploadUrl?: string
    imageUploadField?: string
}

function EditorJSField({
    isFetching,
    value,
    holder = defaultHolder,
    minHeight = 247,
    onChange,
    imageUploadUrl,
    imageUploadField,
    onImageUpload,
    tools,
    ...rest
}: EditorProps) {
    const ref = useRef<EditorJS | null>(null)

    useEffect(() => {
        if (!ref.current) {
            const editor = new EditorJS({
                holder,
                tools: tools ?? {
                    ...EDITOR_TOOLS,
                    image: {
                        ...EDITOR_TOOLS.image,
                        config: {
                            endpoints: {
                                byFile: imageUploadUrl,
                            },
                            field: imageUploadField,
                            uploader: {
                                uploadByFile: onImageUpload,
                            },
                        },
                    },
                },
                data: value,
                minHeight,
                async onChange(api) {
                    const data = await api.saver.save()

                    onChange(data)
                },
                ...rest,
            })
            ref.current = editor
        }

        return () => {
            ref.current?.destroy()
            ref.current = null
        }
    }, [isFetching])

    return (
        <section className={styles.section}>
            <div id={holder} />
        </section>
    )
}

export default EditorJSField
