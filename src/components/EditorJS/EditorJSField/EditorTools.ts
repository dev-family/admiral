import Header from '@editorjs/header'
import Image from '@editorjs/image'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'

export const EDITOR_TOOLS = {
    header: { class: Header, inlineToolbar: true },
    image: { class: Image, inlineToolbar: true },
    list: {
        class: List,
        inlineToolbar: true,
        config: {
            defaultStyle: 'ordered',
        },
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        config: {
            preserveBlank: true,
        },
    },
}
