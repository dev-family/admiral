import * as React from 'react'
import { enUS } from './locales'
import type { UploadProps } from './interfaces'
import { Upload } from './Upload'
import { FiInbox } from 'react-icons/fi'
import styles from './Upload.module.scss'

export type DraggerProps = UploadProps & { height?: number }

const getDraggerLayoutExample = (locale: UploadProps['locale']) => (
    <div className={styles.uploadStyleExample}>
        <div className={styles.uploadStyleExample__img}>
            <FiInbox />
        </div>
        <p className={styles.uploadStyleExample__text}>{locale?.clickToUpload}</p>
    </div>
)
const InternalDragger: React.ForwardRefRenderFunction<unknown, DraggerProps> = (
    { style, height, locale = enUS, ...restProps },
    ref,
) => (
    <Upload
        ref={ref}
        children={getDraggerLayoutExample(locale)}
        {...restProps}
        type="drag"
        style={{ ...style, height }}
    />
)

export const Dragger = React.forwardRef(InternalDragger) as React.FC<DraggerProps>

Dragger.displayName = 'Dragger'
