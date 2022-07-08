import React from 'react'
import {
    RcFile,
    UploadRequestOption as RcCustomRequestOptions,
    UploadProps as RcUploadProps,
} from 'rc-upload/lib/interface'

export type { RcFile }

export type UploadFileStatus = 'error' | 'removed'
export type UploadFileError = { message: string }

export interface UploadFile {
    uid: string
    size?: number
    name: string
    fileName?: string
    lastModified?: number
    lastModifiedDate?: Date
    url?: string
    status?: UploadFileStatus
    thumbUrl?: string
    error?: UploadFileError
    type?: string
    preview?: string
}

export interface UploadChangeParam<T = UploadFile> {
    file: T
    fileList: UploadFile[]
}

export interface ShowUploadListInterface {
    showRemoveIcon?: boolean
    showPreviewIcon?: boolean
}

export interface UploadLocale {
    removeFile?: string
    previewFile?: string
    uploadError?: string
}

export type UploadType = 'drag' | 'select'
export type UploadListType = 'text' | 'picture' | 'picture-card'

export type ItemRender<T = any> = (
    originNode: React.ReactElement,
    file: UploadFile,
    fileList: Array<UploadFile>,
    actions: {
        remove: () => void
    },
) => React.ReactNode

type BeforeUploadValueType = void | boolean | string | Blob | File

export interface UploadProps<T = any> extends Pick<RcUploadProps, 'capture'> {
    type?: UploadType
    name?: string
    fileList?: Array<UploadFile>
    directory?: boolean
    data?:
        | Record<string, unknown>
        | ((file: UploadFile) => Record<string, unknown> | Promise<Record<string, unknown>>)
    showUploadList?: boolean | ShowUploadListInterface
    multiple?: boolean
    accept?: string
    beforeUpload?: (
        file: RcFile,
        FileList: RcFile[],
    ) => BeforeUploadValueType | Promise<BeforeUploadValueType>
    onChange?: (info: UploadChangeParam<UploadFile>) => void
    onPreview?: (file: UploadFile) => void
    listType?: UploadListType
    className?: string
    style?: React.CSSProperties
    disabled?: boolean
    prefixCls?: string
    customRequest?: (options: RcCustomRequestOptions) => void
    openFileDialogOnClick?: boolean
    locale?: UploadLocale
    id?: string
    isImageUrl?: (file: UploadFile) => boolean
    itemRender?: ItemRender<T>
    /** Config max count of `fileList`. Will replace current one when `maxCount` is 1 */
    maxCount?: number
}

export interface UploadState<T = any> {
    fileList: UploadFile[]
    dragState: string
}

type PreviewFileHandler = (file: File | Blob) => PromiseLike<string>

export interface UploadListProps<T = any> {
    listType?: UploadListType
    onRemove?: (file: UploadFile) => void | boolean
    onPreview?: (file: UploadFile) => void | boolean
    items?: Array<UploadFile>
    showRemoveIcon?: boolean
    showPreviewIcon?: boolean
    locale: UploadLocale
    isImageUrl?: (file: UploadFile) => boolean
    itemRender?: ItemRender<T>
    previewFile?: PreviewFileHandler
}

export interface ListItemProps {
    locale: UploadLocale
    file: UploadFile
    items: UploadFile[]
    listType?: UploadListType
    isImgUrl?: (file: UploadFile) => boolean
    showRemoveIcon?: boolean
    showPreviewIcon?: boolean
    itemRender?: ItemRender
    onClose: (file: UploadFile) => void
    onPreview: (e: React.MouseEvent, file: UploadFile) => void
}
