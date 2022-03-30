import React from 'react'
import cn from 'classnames'
import { Tooltip } from '../../Tooltip'
import { Button } from '../../Button'
import { FiTrash, FiFile, FiVideo, FiImage } from 'react-icons/fi'
import { isVideoUrl } from '../utils'
import { ListItemProps } from '../interfaces'
import styles from '../Upload.module.scss'

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
            onClose,
        }: ListItemProps,
        ref: React.Ref<HTMLDivElement>,
    ) => {
        const removeIcon = showRemoveIcon ? (
            <Button
                view="clear"
                size="S"
                type="button"
                iconLeft={<FiTrash />}
                title={locale.removeFile}
                onClick={() => onClose(file)}
            />
        ) : null

        const actions = (
            <span key="actions" className={styles.item_Actions}>
                {removeIcon}
            </span>
        )

        const preview = [
            <span key="view" className={styles.item_Name} title={file.name}>
                {file.name}
            </span>,
            actions,
        ]

        const itemContent = (
            <div className={cn(styles.item, { [styles.item__Error]: file.status === 'error' })}>
                <div className={styles.item_Content}>
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
            <div ref={ref}>
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
        isImgUrl && isImgUrl(file) ? <FiImage /> : isVideoUrl(file) ? <FiVideo /> : <FiFile />

    let node = <></>
    if (listType === 'picture') {
        if (!file.thumbUrl && !file.url) {
            node = <div className={styles.item_Thumb}>{iconNode}</div>
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
            node = file.url ? (
                <div className={styles.item_Thumb}>
                    {thumbnail}
                    <a className={styles.item_Link} target="_blank" rel="noopener noreferrer" />
                </div>
            ) : (
                <div className={styles.item_Thumb}>{thumbnail}</div>
            )
        }
    }

    return node
}

export default ListItem
