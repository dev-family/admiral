import React, { useState } from 'react'
import { Page, Editor } from '../../admiral'

const specialChars = [
    { text: 'dog', value: '{dog}', icon: '🐶' },
    { text: 'cat', value: '{cat}', icon: '🐱' },
    { text: 'pig', value: '{pig}', icon: '🐷' },
    { text: 'fish', value: '{fish}', icon: '🐠' },
    { text: 'mouse', value: '{mouse}', icon: '🐭' },
    { text: 'unicorn', value: '{unicorn}', icon: '🦄' },
    { text: 'fox', value: '{fox}', icon: '🦊' },
]

export default function EditorPage() {
    const [value, setValue] = useState(
        '<p><a href="aasdad">asdadsadsadsads</a></p><h1>Заголовок 1</h1><h2>Заголовок 2</h2><h3>Заголовок 3</h3><h4>Заголовок 4</h4><h5>Заголовок 5</h5><h6>Заголовок 6</h6><table style="border-collapse: collapse; width: 100%; height: 38.3906px;" border="1"><colgroup><col style="width: 33.369%;"><col style="width: 33.369%;"><col style="width: 33.369%;"></colgroup><tbody><tr style="height: 19.1953px;"><td style="height: 19.1953px;">ddd</td><td style="height: 19.1953px;">ddd</td><td style="height: 19.1953px;">ddd</td></tr><tr style="height: 19.1953px;"><td style="height: 19.1953px;">&nbsp;</td><td style="height: 19.1953px;">&nbsp;</td><td style="height: 19.1953px;">&nbsp;</td></tr></tbody></table>',
    )

    const onChange = (value: string) => {
        setValue(value)
    }

    return (
        <Page title="Editor">
            <div
                style={{
                    display: 'grid',
                    gridGap: '24px',
                }}
            >
                <h2>Default</h2>
                <Editor />
                <h2>With Image Upload</h2>
                <Editor value={value} onChange={onChange} imageUploadUrl="/api/editorUpload" />
                <h2>Autocompleter (print @): 'autocompleteitem' mode</h2>
                <Editor
                    autocompleter={{
                        id: 'special_chars_1',
                        mode: 'autocompleteitem',
                        items: specialChars,
                        columns: 'auto',
                    }}
                />
                <h2>Autocompleter (print @): 'cardmenuitem' mode</h2>
                <Editor
                    autocompleter={{
                        id: 'special_chars_2',
                        mode: 'cardmenuitem',
                        items: specialChars,
                    }}
                />
                <h2>Autocompleter (print @): 'cardmenuitem' mode / filter / highlight</h2>
                <Editor
                    autocompleter={{
                        id: 'special_chars_3',
                        mode: 'cardmenuitem',
                        items: specialChars,
                        columns: 1,
                        filterOnInput: true,
                        highlightOnSearch: true,
                    }}
                />
                <h2>Locale</h2>
                <Editor locale="ru" />
            </div>
        </Page>
    )
}
