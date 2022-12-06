import React from 'react'
import { Page, TranslatableInput } from '../../admiral'

const languages = [
    { label: 'English', value: 'en' },
    { label: 'Русский', value: 'ru' },
]

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
                />
                <h2>MultilineText</h2>
                <TranslatableInput
                    name="name"
                    languages={languages}
                    field="multilineText"
                    placeholder="Write something..."
                />
                <h2>Editor</h2>
                <TranslatableInput name="name" languages={languages} field="editor" />
                <h2>Tab types</h2>
                <TranslatableInput
                    name="name"
                    languages={languages}
                    tabType="line"
                    placeholder="Write something..."
                />
                <TranslatableInput
                    name="name"
                    languages={languages}
                    placeholder="Write something..."
                />
            </div>
        </Page>
    )
}
