import React from 'react'
import { enUS } from './locales'
import type { UploadProps } from './interfaces'
import { Upload } from './Upload'
import { FiInbox } from 'react-icons/fi'
import styles from './Upload.module.scss'

export type DraggerProps = UploadProps & { height?: number }

const getDraggerLayoutExample = (locale: UploadProps['locale']) => (
    <>
        <div className={styles.uploadStyleExample_Img}>
            <FiInbox />
        </div>
        <p className={styles.uploadStyleExample_Text}>{locale?.clickToUpload}</p>
    </>
)

export function Dragger({
    ref,
    style,
    height,
    locale = enUS,
    children,
    ...restProps
}: DraggerProps & { ref?: React.Ref<unknown>; children?: React.ReactNode }) {
    return (
        <Upload
            ref={ref}
            children={children || getDraggerLayoutExample(locale)}
            {...restProps}
            type="drag"
            style={{ ...style, height }}
        />
    )
}

Dragger.displayName = 'Dragger'
