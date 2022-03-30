import React, { useEffect } from 'react'
import ListItem from './UploadListItem'
import { useForceUpdate } from '../../../utils/hooks'
import { previewImage, isImageUrl } from '../utils'
import { useTransition, animated, config } from 'react-spring'
import { UploadListProps, UploadFile } from '../interfaces'
import styles from '../Upload.module.scss'

// TODO: text/picture-card listType

const UploadList: React.FC<UploadListProps> = ({
    listType,
    onRemove,
    locale,
    isImageUrl: isImgUrl,
    items = [],
    showRemoveIcon,
    itemRender,
    previewFile,
}) => {
    const forceUpdate = useForceUpdate()
    useEffect(() => {
        if (listType !== 'picture') {
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

            file.thumbUrl = ''
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

    const transitions = useTransition(items, {
        initial: { opacity: 1, transform: 'translate3d(0px, 0%, 0px)', height: 60 },
        from: { opacity: 0, transform: 'translate3d(0px, 10%, 0px)' },
        enter: { opacity: 1, transform: 'translate3d(0px, 0%, 0px)', height: 60 },
        leave: {
            opacity: 0,
            transform: 'translate3d(0px, -10%, 0px)',
            height: 0,
            config: { duration: 100 },
        },
        update: { height: 60 },
        config: (book) => ({
            ...config.stiff,
            friction: 0,
            duration: 160,
            clamp: !items.find((item) => item.uid === book.uid),
        }),
    })

    return (
        <div className={styles.list}>
            {transitions((style, file) => (
                <animated.div style={style}>
                    <ListItem
                        locale={locale}
                        file={file}
                        items={items}
                        listType={listType}
                        isImgUrl={isImgUrl}
                        showRemoveIcon={showRemoveIcon}
                        itemRender={itemRender}
                        onClose={onInternalClose}
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
