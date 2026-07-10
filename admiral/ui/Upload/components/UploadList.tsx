import React, { useEffect, useMemo } from 'react'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core'
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import ListItem from './UploadListItem'
import { useForceUpdate } from '../../../utils/hooks'
import { previewImage, isImageUrl } from '../utils'
import { useTransition, animated, config } from '@react-spring/web'
import {
    UploadListProps,
    UploadFile,
    UploadListType,
    UploadLocale,
    ItemRender,
} from '../interfaces'
import styles from '../Upload.module.scss'
import cn from 'classnames'

// TODO: text listType

interface SortableUploadItemProps {
    id: string
    file: UploadFile
    items: UploadFile[]
    listType?: UploadListType
    locale: UploadLocale
    isImgUrl?: (file: UploadFile) => boolean
    showRemoveIcon?: boolean
    showPreviewIcon?: boolean
    showDownloadIcon?: boolean
    itemRender?: ItemRender
    onClose: (file: UploadFile) => void
    onPreview: (e: React.MouseEvent, file: UploadFile) => void
    onDownload?: (file: UploadFile) => void
    isDragDisabled: boolean
    springStyle?: any
}

function SortableUploadItem({
    id,
    file,
    items,
    listType,
    locale,
    isImgUrl,
    showRemoveIcon,
    showPreviewIcon,
    showDownloadIcon,
    itemRender,
    onClose,
    onPreview,
    onDownload,
    isDragDisabled,
    springStyle,
}: SortableUploadItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
        disabled: isDragDisabled,
    })

    const sortableStyle: React.CSSProperties = {
        transition: transition ?? undefined,
        transform: transform
            ? `translate3d(${Math.round(transform.x)}px, ${Math.round(transform.y)}px, 0)`
            : undefined,
        ...(isDragging && { zIndex: 999, opacity: 0.5 }),
    }

    const itemContent = (
        <div
            ref={setNodeRef}
            {...attributes}
            className={cn(styles.droppable__item, {
                [styles['droppable__item--text_type']]: listType === 'text',
                [styles['droppable__item--picture_card']]: listType === 'picture-card',
                [styles['droppable__item--dragged']]: isDragging,
            })}
            style={sortableStyle}
        >
            <ListItem
                locale={locale}
                file={file}
                items={items}
                listType={listType}
                isImgUrl={isImgUrl}
                showRemoveIcon={showRemoveIcon}
                showPreviewIcon={showPreviewIcon}
                showDownloadIcon={showDownloadIcon}
                itemRender={itemRender}
                onClose={onClose}
                onPreview={onPreview}
                onDownload={onDownload}
                showDragHandle={!isDragDisabled}
                dragListeners={listeners}
            />
        </div>
    )

    if (springStyle) {
        return <animated.div style={springStyle}>{itemContent}</animated.div>
    }

    return itemContent
}

function UploadList({
    listType = 'picture',
    onRemove,
    onPreview,
    onDownload,
    locale,
    isImageUrl: isImgUrl = isImageUrl,
    items = [],
    showRemoveIcon = true,
    showPreviewIcon,
    showDownloadIcon,
    itemRender,
    previewFile = previewImage,
    appendButton,
    onDragEnd,
}: UploadListProps) {
    const forceUpdate = useForceUpdate()
    useEffect(() => {
        if (listType !== 'picture' && listType !== 'picture-card') {
            return
        }

        ;(items || []).forEach((file) => {
            if (
                typeof document === 'undefined' ||
                typeof window === 'undefined' ||
                !window.FileReader ||
                !window.File ||
                !(file instanceof File) ||
                file.thumbUrl !== undefined
            ) {
                return
            }

            if (previewFile) {
                previewFile(file as unknown as File).then((previewDataUrl: string) => {
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
        e?.preventDefault()
        return onPreview(file)
    }

    // Spring enter/leave is intentionally disabled for draggable lists (v5
    // behaved the same way): the animated wrapper interferes with dnd-kit
    // measurements and transforms. For non-`picture` list types height is
    // 'auto', which react-spring cannot interpolate — removals collapse
    // instantly there (also v5 parity); only `picture` animates via 68px.
    const transitions = useTransition(
        items,
        onDragEnd
            ? {}
            : {
                  initial: {
                      opacity: 1,
                      transform: 'translate3d(0px, 0%, 0px)',
                      height: listType !== 'picture' ? 'auto' : 68,
                  },
                  from: { opacity: 0, transform: 'translate3d(0px, 10%, 0px)' },
                  enter: {
                      opacity: 1,
                      transform: 'translate3d(0px, 0%, 0px)',
                      height: listType !== 'picture' ? 'auto' : 68,
                  },
                  leave: {
                      opacity: 0,
                      transform: 'translate3d(0px, -10%, 0px)',
                      height: 0,
                      config: { duration: 100 },
                  },
                  update: { height: listType !== 'picture' ? 'auto' : 68 },
                  config: (book) => ({
                      ...config.stiff,
                      friction: 0,
                      duration: 160,
                      clamp: !items.find((item) => item.uid === book.uid),
                  }),
              },
    )

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    )

    const sortableItems = useMemo(() => items.map((file) => file.uid), [items])

    const strategy =
        listType === 'picture-card' ? horizontalListSortingStrategy : verticalListSortingStrategy

    const isDragDisabled = !onDragEnd || !items || items.length <= 1

    const handleDragEnd = (event: DragEndEvent) => {
        onDragEnd?.(event)
    }

    return (
        <div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={sortableItems} strategy={strategy}>
                    <ul
                        className={cn(styles.droppable, {
                            [styles.droppable__TextType]:
                                listType === 'text' || listType === 'picture',
                            [styles['droppable-picture-card']]: listType === 'picture-card',
                        })}
                    >
                        {transitions((springStyle, file, _t, _idx) => {
                            return (
                                <SortableUploadItem
                                    key={file.uid}
                                    id={file.uid}
                                    file={file}
                                    items={items}
                                    listType={listType}
                                    locale={locale}
                                    isImgUrl={isImgUrl}
                                    showRemoveIcon={showRemoveIcon}
                                    showPreviewIcon={showPreviewIcon}
                                    showDownloadIcon={showDownloadIcon}
                                    itemRender={itemRender}
                                    onClose={onInternalClose}
                                    onPreview={onInternalPreview}
                                    onDownload={onDownload}
                                    isDragDisabled={isDragDisabled}
                                    springStyle={onDragEnd ? undefined : springStyle}
                                />
                            )
                        })}
                        {appendButton}
                    </ul>
                </SortableContext>
            </DndContext>
        </div>
    )
}

UploadList.displayName = 'UploadList'

export default UploadList
