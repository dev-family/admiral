import React from 'react'
import cn from 'classnames'
import { Tooltip } from '../../Tooltip'
import { Button } from '../../Button'
import { FiTrash, FiFile, FiVideo, FiImage, FiEye, FiPaperclip, FiDownload } from 'react-icons/fi'
import { isVideoUrl } from '../utils'
import { ListItemProps } from '../interfaces'
import styles from '../Upload.module.scss'
import { useTheme } from '../../../theme'
import { internalDownloadFile } from '../../../utils/helpers'
// TODO: show preview with modal

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

        const removeIcon = showRemoveIcon ? (
            <Button
                view="clear"
                size="S"
                type="button"
                iconLeft={<FiTrash />}
                title={locale.removeFile}
                onClick={() => onClose(file)}
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
                onClick={(e) => onPreview(e, file)}
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

export default ListItem
