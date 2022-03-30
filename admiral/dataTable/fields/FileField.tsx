import React from 'react'
import { FiCameraOff, FiVideo, FiFile } from 'react-icons/fi'
import { UploadFile } from '../../ui/Upload/interfaces'
import { isImageUrl, isVideoUrl } from '../../ui/Upload/utils'
import styles from './TableFields.module.scss'

export type FileFieldProps = UploadFile

export const FileField = (file: FileFieldProps) => {
    const { thumbUrl, url } = file || {}
    const src = thumbUrl || url

    let node = <FiCameraOff />

    if (src) {
        if (isImageUrl(file)) {
            node = <img src={src} />
        } else if (isVideoUrl(file)) {
            node = thumbUrl ? <img src={thumbUrl} /> : <FiVideo />
        } else {
            node = <FiFile />
        }
    }

    return <div className={styles.file}>{node}</div>
}
