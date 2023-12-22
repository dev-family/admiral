import { IAllProps as TinyEditorProps } from '@tinymce/tinymce-react'

export interface BlobInfo {
    id: () => string
    name: () => string
    filename: () => string
    blob: () => Blob
    base64: () => string
    blobUri: () => string
    uri: () => string | undefined
}

type ProgressFn = (percent: number) => void
export type EditorUploadHandler = (blobInfo: BlobInfo, progress: ProgressFn) => Promise<string>

export type EditorSizeType = 'L' | 'M' | 'S' | 'XS'
export type EditorLocaleType = string | undefined

export interface EditorProps extends Omit<TinyEditorProps, 'onChange' | 'onEditorChange'> {
    height?: number
    imageUploadUrl?: string
    size?: EditorSizeType
    init?:
        | TinyEditorProps['init']
        | ((defaultInit: TinyEditorProps['init']) => TinyEditorProps['init'])
    onChange?: TinyEditorProps['onEditorChange']
    alert?: boolean
    onImageUpload?: (file: Blob) => Promise<string>
    autocompleter?: AutocompleterConfig | AutocompleterConfig[]
    locale?: EditorLocaleType
    autoFocus?: boolean
}

export type AutocompleterItem = {
    text: string
    value: string
    icon?: string
}

export type AutocompleterMode = 'autocompleteitem' | 'cardmenuitem'

export interface AutocompleterConfig {
    id: string
    trigger?: string
    minCharsToTrigger?: number
    items: AutocompleterItem[]
    highlightOnSearch?: boolean
    filterOnInput?: boolean
    mode?: AutocompleterMode
    includeValueInTitle?: boolean
    columns?: number | 'auto'
}
