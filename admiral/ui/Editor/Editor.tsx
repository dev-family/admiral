import React, { useMemo, useCallback } from 'react'
import { useTheme, useThemeVars } from '../../theme'
import { Editor as TinyEditor } from '@tinymce/tinymce-react'
import type { IAllProps as TinyEditorProps } from '@tinymce/tinymce-react'
import { setupAutocompleters } from './setup'
import cn from 'classnames'
import { EditorProps, BlobInfo } from './interfaces'
import './Editor.scss'

const Editor = ({
    size = 'M',
    alert = false,
    value,
    onChange,
    imageUploadUrl,
    onImageUpload,
    init,
    autocompleter,
    height = 300,
    ...rest
}: EditorProps) => {
    const { themeName } = useTheme()
    const { varsInline } = useThemeVars()

    const _onImageUpload = useCallback(
        (blobInfo: BlobInfo) => {
            return onImageUpload!(blobInfo.blob())
        },
        [onImageUpload],
    )

    const initParams = useMemo<TinyEditorProps['init']>(
        () => ({
            height,
            setup: function (editor) {
                editor.on('PostRender', function () {
                    var container = editor.getContainer()
                    var uiContainer = document.querySelector(
                        'body > .tox.tox-tinymce-aux',
                    ) as HTMLDivElement
                    container.parentNode!.appendChild(uiContainer)
                })

                if (autocompleter) setupAutocompleters(editor, autocompleter)
            },
            menubar: false,
            toolbar:
                'blocks bold italic underline strikethrough | link image charmap emoticons | alignleft aligncenter alignright alignjustify | bullist numlist blockquote table | pastetext removeformat fullscreen code',
            toolbar_mode: 'floating',
            toolbar_sticky: true,
            contextmenu: 'link charmap emoticons',
            language: 'ru',
            block_formats:
                'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6;',
            plugins: 'link autolink lists code table image charmap emoticons fullscreen',
            paste_as_text: true,
            link_rel_list: [
                { title: 'None', value: null },
                { title: 'No Follow', value: 'nofollow' },
            ],
            valid_children: '+body[style]',
            advlist_bullet_styles: 'default',
            custom_colors: false,
            automatic_uploads: true,
            images_upload_url: imageUploadUrl,
            images_upload_handler: onImageUpload ? _onImageUpload : undefined,
            table_appearance_options: false,
            table_advtab: false,
            table_cell_advtab: false,
            table_row_advtab: false,
            content_css: '/lib/tinymce/css/styles.css',
            formats: {
                alignleft: {
                    selector: 'p,h1,h2,h3,h4,h5,h6,div,img,tr,td,th',
                    classes: 'align-left',
                },
                aligncenter: {
                    selector: 'p,h1,h2,h3,h4,h5,h6,div,img,tr,td,th',
                    classes: 'align-center',
                },
                alignright: {
                    selector: 'p,h1,h2,h3,h4,h5,h6,div,img,tr,td,th',
                    classes: 'align-right',
                },
                alignfull: {
                    selector: 'p,h1,h2,h3,h4,h5,h6,div,img',
                    classes: 'align-justify',
                },
            },
            body_class: cn('editor-body', {
                'editor-body--size-l': size === 'L',
                'editor-body--size-s': size === 'S',
                'editor-body--size-xs': size === 'XS',
            }),
            content_style: `:root { ${varsInline}; }`,
        }),
        [varsInline, size, imageUploadUrl, height],
    )

    const _init = useMemo(() => {
        if (typeof init === 'function') {
            return init(initParams)
        } else {
            return { ...initParams, ...init }
        }
    }, [init, initParams])

    const _onChange: TinyEditorProps['onEditorChange'] = (value, editor) => {
        onChange?.(value, editor)
    }

    const editorStyle = useMemo(() => ({ minHeight: height }), [height])

    return (
        <div style={editorStyle} className={cn('editor', { 'editor--alert': alert })}>
            <TinyEditor
                key={themeName}
                tinymceScriptSrc="/lib/tinymce/js/tinymce/tinymce.min.js"
                value={value}
                onEditorChange={_onChange}
                init={_init}
                {...rest}
            />
        </div>
    )
}

export default Editor
