import React from 'react'
import api from '../../src/api'
import { Page, TranslatableInput } from '../../admiral'

const languages = [
    { label: 'English', value: 'en' },
    { label: 'Русский', value: 'ru' },
]

const onImageUpload = (file: Blob) => {
    return api.editorImageUpload('editorUpload', { file })
}

export default function TranslatablePage() {
    return (
        <Page title="Translatable">
            <div
                style={{
                    display: 'grid',
                    gridGap: '24px',
                }}
            >
                <h2>Text</h2>
                <TranslatableInput
                    name="name"
                    languages={languages}
                    placeholder="Write something..."
                    label="Name"
                    required
                    field="text"
                />
                <h2>MultilineText</h2>
                <TranslatableInput
                    name="name"
                    languages={languages}
                    field="multilineText"
                    placeholder="Write something..."
                />
                <h2>Editor</h2>
                <TranslatableInput
                    name="name"
                    languages={languages}
                    field="editor"
                    props={{
                        onImageUpload: onImageUpload,
                    }}
                />
                <h2>Tab types</h2>
                <TranslatableInput
                    name="name"
                    languages={languages}
                    tabType="line"
                    placeholder="Write something..."
                    field="text"
                />
                <TranslatableInput
                    name="name"
                    languages={languages}
                    placeholder="Write something..."
                    field="text"
                />
            </div>
        </Page>
    )
}
