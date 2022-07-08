import React, { useEffect } from 'react'
import ListItem from './UploadListItem'
import { useForceUpdate } from '../../../utils/hooks'
import { previewImage, isImageUrl } from '../utils'
import { useTransition, animated, config } from 'react-spring'
import { UploadListProps, UploadFile } from '../interfaces'
import styles from '../Upload.module.scss'
import cn from 'classnames'

// TODO: text listType

const UploadList: React.FC<UploadListProps> = ({
    listType,
    onRemove,
    onPreview,
    locale,
    isImageUrl: isImgUrl,
    items = [],
    showRemoveIcon,
    showPreviewIcon,
    itemRender,
    previewFile,
}) => {
    const forceUpdate = useForceUpdate()
    useEffect(() => {
        if (listType !== 'picture' && listType !== 'picture-card') {
            return
        }

        ;(items || []).forEach((file) => {
            if (
                typeof document === 'undefined' ||
                typeof window === 'undefined' ||
                !(window as any).FileReader ||
                !(window as any).File ||
                !(file instanceof File) ||
                file.thumbUrl !== undefined
            ) {
                return
            }

            if (previewFile) {
                previewFile(file as any as File).then((previewDataUrl: string) => {
                    file.thumbUrl = previewDataUrl || ''
                    forceUpdate()
                })
            }
        })
    }, [listType, items, previewFile])

    // ============================= Events =============================
    const onInternalClose = (file: UploadFile) => {
        onRemove?.(file)
    }
    const onInternalPreview = (e: React.MouseEvent, file: UploadFile) => {
        if (!onPreview) {
            return
        }
        console.log('first', e, file)
        e?.preventDefault()
        return onPreview(file)
    }

    const transitions = useTransition(items, {
        initial: {
            opacity: 1,
            transform: 'translate3d(0px, 0%, 0px)',
            height: listType === 'picture-card' ? 'auto' : 60,
        },
        from: { opacity: 0, transform: 'translate3d(0px, 10%, 0px)' },
        enter: {
            opacity: 1,
            transform: 'translate3d(0px, 0%, 0px)',
            height: listType === 'picture-card' ? 'auto' : 60,
        },
        leave: {
            opacity: 0,
            transform: 'translate3d(0px, -10%, 0px)',
            height: 0,
            config: { duration: 100 },
        },
        update: { height: listType === 'picture-card' ? 'auto' : 60 },
        config: (book) => ({
            ...config.stiff,
            friction: 0,
            duration: 160,
            clamp: !items.find((item) => item.uid === book.uid),
        }),
    })

    return (
        <div
            className={cn(styles.list, {
                [styles['list-picture-card']]: listType === 'picture-card',
            })}
        >
            {transitions((style, file) => (
                <animated.div style={style}>
                    <ListItem
                        locale={locale}
                        file={file}
                        items={items}
                        listType={listType}
                        isImgUrl={isImgUrl}
                        showRemoveIcon={showRemoveIcon}
                        showPreviewIcon={showPreviewIcon}
                        itemRender={itemRender}
                        onClose={onInternalClose}
                        onPreview={onInternalPreview}
                    />
                </animated.div>
            ))}
        </div>
    )
}

UploadList.displayName = 'UploadList'

UploadList.defaultProps = {
    listType: 'picture',
    showRemoveIcon: true,
    isImageUrl,
    previewFile: previewImage,
}

export default UploadList
