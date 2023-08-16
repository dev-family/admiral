import React, { MouseEvent, useState } from 'react'
import cn from 'classnames'
import { Tooltip } from '../../Tooltip'
import { Button } from '../../Button'
import {
    FiTrash,
    FiFile,
    FiVideo,
    FiImage,
    FiEye,
    FiPaperclip,
    FiDownload,
    FiX,
} from 'react-icons/fi'
import { isVideoUrl } from '../utils'
import { ListItemProps } from '../interfaces'
import styles from '../Upload.module.scss'
import { useTheme } from '../../../theme'
import { internalDownloadFile } from '../../../utils/helpers'
import { UploadFile } from '../interfaces'
import { Dialog } from '../../Dialog'

const ListItem = React.forwardRef(
    (
        {
            locale,
            listType = 'picture',
            file,
            items,
            itemRender,
            isImgUrl,
            showRemoveIcon,
            showPreviewIcon = true,
            showDownloadIcon,
            onClose,
            onPreview,
            onDownload,
        }: ListItemProps,
        ref: React.Ref<HTMLDivElement>,
    ) => {
        const { themeName, themeClassNames } = useTheme()
        const [visible, setVisible] = useState(false)

        const removeFile = (file: UploadFile) => (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            onClose(file)
        }

        const showPreview = (e: MouseEvent<HTMLButtonElement>) => {
            setVisible(true)
            onPreview(e, file)
        }

        const removeIcon = showRemoveIcon ? (
            <Button
                view="clear"
                size="S"
                type="button"
                iconLeft={<FiTrash />}
                title={locale.removeFile}
                onClick={removeFile(file)}
                className={cn(styles.item_ActionButton, {
                    [themeClassNames.color.invert]:
                        listType === 'picture-card' && themeName === 'light',
                })}
            />
        ) : null

        const previewIcon = showPreviewIcon ? (
            <Button
                view="clear"
                size="S"
                type="button"
                iconLeft={<FiEye />}
                title={locale.previewFile}
                disabled={file.url || file.thumbUrl ? false : true}
                onClick={showPreview}
                className={cn(styles.item_ActionButton, {
                    [themeClassNames.color.invert]:
                        listType === 'picture-card' && themeName === 'light',
                })}
            />
        ) : null

        const downloadIcon = showDownloadIcon ? (
            <Button
                view="clear"
                size="S"
                type="button"
                iconLeft={<FiDownload />}
                title={locale.downloadFile}
                onClick={() => (!!onDownload ? onDownload(file) : internalDownloadFile(file))}
                disabled={file?.url ? false : true}
                className={cn(styles.item_ActionButton, {
                    [themeClassNames.color.invert]:
                        listType === 'picture-card' && themeName === 'light',
                })}
            />
        ) : null

        const actions = (
            <span
                key="actions"
                className={cn(styles.item_Actions, {
                    [styles.item_Actions__PictureCard]: listType === 'picture-card',
                    [styles.item_Actions__TextType]: listType === 'text',
                })}
            >
                {downloadIcon}
                {previewIcon}
                {removeIcon}
            </span>
        )

        const preview = [
            listType !== 'picture-card' ? (
                <span key="view" className={styles.item_Name} title={file.name}>
                    {file.name}
                </span>
            ) : null,
            actions,
            listType == 'picture-card' ? (
                <ListItemPreview file={file} visible={visible} onClose={() => setVisible(false)} />
            ) : null,
        ]

        const itemContent = (
            <div
                className={cn(styles.item, {
                    [styles.item__PictureCard]: listType === 'picture-card',
                    [styles.item__TextType]: listType === 'text',
                    [styles.item__Error]: file.status === 'error',
                })}
            >
                <div
                    className={cn(styles.item_Content, {
                        [styles.item_Content__PictureCard]: listType === 'picture-card',
                    })}
                >
                    <ListItemThumb isImgUrl={isImgUrl} listType={listType} file={file} />
                    {preview}
                </div>
            </div>
        )

        let message = file.error?.message || locale.uploadError
        const item =
            file.status === 'error' ? (
                <Tooltip
                    trigger="mouseenter"
                    placement="top"
                    content={message}
                    popperOptions={{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 6],
                                },
                            },
                        ],
                    }}
                >
                    {itemContent}
                </Tooltip>
            ) : (
                itemContent
            )

        return (
            <div ref={ref} style={{ height: '100%' }}>
                {itemRender
                    ? itemRender(item, file, items, {
                          remove: onClose.bind(null, file),
                      })
                    : item}
            </div>
        )
    },
)

const ListItemThumb: React.FC<Pick<ListItemProps, 'isImgUrl' | 'file' | 'listType'>> = ({
    isImgUrl,
    file,
    listType,
}) => {
    const iconNode =
        listType === 'text' ? (
            <FiPaperclip />
        ) : isImgUrl && isImgUrl(file) ? (
            <FiImage />
        ) : isVideoUrl(file) ? (
            <FiVideo />
        ) : (
            <FiFile />
        )

    let node = <></>
    if (listType === 'picture' || listType === 'picture-card') {
        if (!file.thumbUrl && !file.url) {
            node = (
                <div
                    className={cn({
                        [styles.item_Thumb]: listType === 'picture',
                        [styles.item_Thumb__PictureCard]: listType === 'picture-card',
                    })}
                >
                    {iconNode}
                </div>
            )
        } else {
            const thumbnail = isImgUrl?.(file) ? (
                <img
                    src={file.thumbUrl || file.url}
                    alt={file.name}
                    className={styles.item_Image}
                />
            ) : (
                iconNode
            )
            node = (
                <div
                    className={cn({
                        [styles.item_Thumb]: true,
                        [styles.item_Thumb__PictureCard]: listType === 'picture-card',
                    })}
                >
                    {thumbnail}
                    {file.url ? (
                        <a className={styles.item_Link} target="_blank" rel="noopener noreferrer" />
                    ) : null}
                </div>
            )
        }
    }
    if (listType === 'text') {
        const thumbnail = iconNode
        node = (
            <div
                className={cn({
                    [styles.item_Thumb]: true,
                    [styles.item_Thumb__TextType]: true,
                })}
            >
                {thumbnail}
            </div>
        )
    }

    return node
}

const ListItemPreview: React.FC<{ file: UploadFile; visible: boolean; onClose: () => void }> = ({
    file,
    visible,
    onClose,
}) => {
    let node = (
        <div className={cn(styles.item_Preview, { [styles.item_PreviewError]: !file.url })}>
            {file.url ? (
                <img src={file.url} alt={file.name} className={styles.item_Preview__Image} />
            ) : (
                <FiImage />
            )}
        </div>
    )

    return (
        <Dialog visible={visible} onClose={onClose} title={file.name}>
            {node}
        </Dialog>
    )
}

export default ListItem
