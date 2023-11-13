import React from 'react'
import { Page, TextInput, Typography } from '../../admiral'
import { EditorJSInput } from '../../src/components/EditorJS'
import PageTopContent from '../../src/components/PageTopContent'

export default function EditorJsPage() {
    return (
        <Page title="Editor.js field">
            <PageTopContent
                title="Editor.js implementation"
                descr={
                    <>
                        <Typography.Paragraph>
                            Editor.js - popular WYSIWYG editor.
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            In this example, we show how to create your own field and implement a
                            third-party WYSIWYG editor
                        </Typography.Paragraph>
                    </>
                }
                link={{
                    href: 'https://github.com/dev-family/admiral/tree/master/pages/tips-and-tricks/editor-js.tsx',
                    text: 'Code to implement the page',
                }}
            />
            <div style={{ marginTop: '24px' }}>
                <EditorJSInput
                    required
                    imageUploadUrl={'/api/editor-upload'}
                    label="Editor JS"
                    columnSpan={2}
                    name="content"
                    placeholder="Add something..."
                />
            </div>
        </Page>
    )
}
