import React from 'react'
import { UploadProps } from '../../ui/Upload/interfaces'
import { FormItemProps } from '../Item'
export declare type FilePictureInputProps = FormItemProps & {
    name: string
} & UploadProps
export declare const FilePictureInput: React.FC<FilePictureInputProps>
