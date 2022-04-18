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

export interface EditorProps extends Omit<TinyEditorProps, 'onChange' | 'onEditorChange'> {
    imageUploadUrl?: string
    size?: EditorSizeType
    init?:
        | TinyEditorProps['init']
        | ((defaultInit: TinyEditorProps['init']) => TinyEditorProps['init'])
    onChange?: TinyEditorProps['onEditorChange']
    alert?: boolean
    onImageUpload?: (file: Blob) => Promise<string>
}
