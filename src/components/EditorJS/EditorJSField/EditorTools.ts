import Header from '@editorjs/header'
import Image from '@editorjs/image'
import Paragraph from '@editorjs/paragraph'
import NestedList from '@editorjs/nested-list'

export const EDITOR_TOOLS = {
    header: { class: Header, inlineToolbar: true },
    image: { class: Image, inlineToolbar: true },
    list: {
        class: NestedList,
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
