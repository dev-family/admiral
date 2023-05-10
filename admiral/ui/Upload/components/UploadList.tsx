import React, { useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Droppable, Draggable, DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd'
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
    onDownload,
    locale,
    isImageUrl: isImgUrl,
    items = [],
    showRemoveIcon,
    showPreviewIcon,
    showDownloadIcon,
    itemRender,
    previewFile,
    appendButton,
    onDragEnd,
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
        e?.preventDefault()
        return onPreview(file)
    }

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

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd as OnDragEndResponder}>
                <Droppable
                    droppableId={`upload list droppable + ${nanoid()}`}
                    type="upload list droppable"
                    direction={listType === 'picture-card' ? 'horizontal' : 'vertical'}
                >
                    {(provided, snapshot) => (
                        <ul
                            ref={provided.innerRef}
                            className={cn(styles.droppable, {
                                [styles.droppable__TextType]:
                                    listType === 'text' || listType === 'picture',
                                [styles['droppable-picture-card']]: listType === 'picture-card',
                            })}
                            // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                            {...provided.droppableProps}
                        >
                            {transitions((style, file, _, idx) => {
                                return (
                                    <animated.div style={style}>
                                        <Draggable
                                            draggableId={String(idx)}
                                            index={idx}
                                            key={String(idx)}
                                            isDragDisabled={
                                                !onDragEnd || !items || items.length === 1
                                            }
                                        >
                                            {(provided, snapshot) => {
                                                return (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={cn(styles.droppable__item, {
                                                            [styles['droppable__item--text_type']]:
                                                                listType === 'text',
                                                            [styles[
                                                                'droppable__item--picture_card'
                                                            ]]: listType === 'picture-card',
                                                            [styles['droppable__item--dragged']]:
                                                                snapshot.isDragging,
                                                        })}
                                                        // style={{...provided.draggableProps.style}}
                                                    >
                                                        <ListItem
                                                            key={idx}
                                                            locale={locale}
                                                            file={file}
                                                            items={items}
                                                            listType={listType}
                                                            isImgUrl={isImgUrl}
                                                            showRemoveIcon={showRemoveIcon}
                                                            showPreviewIcon={showPreviewIcon}
                                                            showDownloadIcon={showDownloadIcon}
                                                            itemRender={itemRender}
                                                            onClose={onInternalClose}
                                                            onPreview={onInternalPreview}
                                                            onDownload={onDownload}
                                                        />
                                                    </div>
                                                )
                                            }}
                                        </Draggable>
                                    </animated.div>
                                )
                            })}
                            {provided.placeholder}
                            {appendButton}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
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
