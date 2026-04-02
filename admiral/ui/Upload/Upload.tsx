import React, { useMemo, useState } from 'react'
import type { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import RcUpload, { UploadProps as RcUploadProps } from 'rc-upload'
import useMergedState from 'rc-util/lib/hooks/useMergedState'
import cn from 'classnames'
import {
    RcFile,
    ShowUploadListInterface,
    UploadProps,
    UploadFile,
    UploadChangeParam,
} from './interfaces'
import { removeFileItem } from './utils'
import UploadList from './components/UploadList'
import { enUS } from './locales'
import styles from './Upload.module.scss'

import { FiPlus } from 'react-icons/fi'

function InternalUpload({
    ref: _ref,
    fileList,
    showUploadList = true,
    listType,
    onChange,
    onPreview,
    onDownload,
    showDownloadIcon = true,
    onDrop,
    disabled = false,
    locale = enUS,
    isImageUrl,
    className,
    children,
    style,
    type = 'select',
    itemRender,
    maxCount,
    isDraggable,
    multiple = false,
    data = {},
    accept = '',
    ...restProps
}: UploadProps & { ref?: React.Ref<unknown>; children?: React.ReactNode }) {
    const [dragState, setDragState] = useState<string>('drop')
    const [mergedFileList, setMergedFileList] = useMergedState([], {
        value: fileList,
        postState: (list) => list ?? [],
    })
    const upload = React.useRef<any>(null)

    // Control mode will auto fill file uid if not provided
    useMemo(() => {
        const timestamp = Date.now()

        ;(fileList || []).forEach((file, index) => {
            if (!file.uid && !Object.isFrozen(file)) {
                file.uid = `__AUTO__${timestamp}_${index}__`
            }
        })
    }, [fileList])

    const onInternalChange = (file: UploadFile, changedFileList: UploadFile[]) => {
        let cloneList =
            file.status === 'removed' ? changedFileList : [...mergedFileList, ...changedFileList]

        // Cut to match count
        if (maxCount === 1) {
            cloneList = cloneList.slice(-1)
        } else if (maxCount) {
            cloneList = cloneList.slice(0, maxCount)
        }

        setMergedFileList(cloneList)

        const changeInfo: UploadChangeParam<UploadFile> = {
            file: file as UploadFile,
            fileList: cloneList,
        }

        onChange?.(changeInfo)
    }

    const mergedBeforeUpload = async (file: RcFile, fileListArgs: RcFile[]) => {
        if (!disabled) onInternalChange(file, fileListArgs)
        return false
    }

    const handleRemove = (file: UploadFile) => {
        const removedFileList = removeFileItem(file, mergedFileList)

        if (removedFileList) {
            onInternalChange({ ...file, status: 'removed' }, removedFileList)
        }
    }
    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = mergedFileList.findIndex((file) => file.uid === active.id)
        const newIndex = mergedFileList.findIndex((file) => file.uid === over.id)

        if (oldIndex === -1 || newIndex === -1) return

        const result = arrayMove(mergedFileList, oldIndex, newIndex).map((file, index) =>
            Object.assign(file, { order: index }),
        )
        const changeInfo: UploadChangeParam<UploadFile> = {
            file: mergedFileList[oldIndex] as UploadFile,
            fileList: result,
        }
        setMergedFileList(result)
        onChange?.(changeInfo)
    }

    const prefixCls = cn('upload')

    const rcUploadProps = {
        ...({
            fileList,
            showUploadList,
            listType,
            onChange,
            onPreview,
            onDownload,
            showDownloadIcon,
            onDrop,
            disabled,
            locale,
            isImageUrl,
            className,
            children,
            style,
            type,
            itemRender,
            maxCount,
            isDraggable,
            multiple,
            data,
            accept,
            ...restProps,
        } as RcUploadProps),
        prefixCls,
        beforeUpload: mergedBeforeUpload,
        onChange: undefined,
    }

    delete rcUploadProps.className
    delete rcUploadProps.style
    if (!children || disabled) {
        delete rcUploadProps.id
    }

    const renderUploadList = (button?: React.ReactNode) => {
        const { showRemoveIcon } =
            typeof showUploadList === 'boolean' ? ({} as ShowUploadListInterface) : showUploadList
        return showUploadList ? (
            <>
                <UploadList
                    listType={listType}
                    items={mergedFileList}
                    onRemove={handleRemove}
                    onPreview={onPreview}
                    onDownload={onDownload}
                    onDragEnd={isDraggable && !disabled ? onDragEnd : undefined}
                    showRemoveIcon={!disabled && showRemoveIcon}
                    showPreviewIcon={!!onPreview}
                    showDownloadIcon={showDownloadIcon}
                    locale={locale}
                    isImageUrl={isImageUrl}
                    itemRender={itemRender}
                    appendButton={button}
                />
            </>
        ) : null
    }

    const renderUploadButton = (
        buttonType?: 'basic' | 'drag' | 'picture-card' | 'text',
        uploadButtonStyle?: React.CSSProperties,
    ) => {
        if (buttonType === 'drag' || buttonType === 'picture-card') {
            const isAppendAvailable = maxCount && fileList ? maxCount > fileList.length : true
            if (!isAppendAvailable) {
                rcUploadProps.disabled = true
            }
            let buttonLayout = <div className={`${prefixCls}-drag-container`}>{children}</div>

            if (buttonType === 'picture-card' && !children) {
                buttonLayout = (
                    <div className={styles.item_Thumb__DefaultPictureCardUpload}>
                        <FiPlus />
                        {locale.pictureCardUpload}
                    </div>
                )
            }

            const dragCls = cn(
                prefixCls,
                {
                    [`${prefixCls}-drag`]: true,
                    [`${prefixCls}-drag-hover`]: dragState === 'dragover',
                    [`${prefixCls}-disabled`]: disabled || !isAppendAvailable,
                },
                className,
            )

            return (
                <div
                    className={dragCls}
                    onDrop={onFileDrop}
                    onDragOver={onFileDrop}
                    onDragLeave={onFileDrop}
                    style={{
                        ...style,
                        display: buttonType === 'picture-card' && !isAppendAvailable ? 'none' : '',
                    }}
                >
                    <RcUpload
                        {...rcUploadProps}
                        ref={upload}
                        disabled={disabled}
                        className={cn({
                            [`${prefixCls}-btn`]: buttonType === 'drag',
                            [styles.item]: buttonType === 'picture-card',
                        })}
                    >
                        {buttonLayout}
                    </RcUpload>
                </div>
            )
        }
        return (
            <div className={styles.buttonWrap} style={uploadButtonStyle}>
                <RcUpload {...rcUploadProps} ref={upload} />
            </div>
        )
    }

    const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        setDragState(e.type)

        if (e.type === 'drop') {
            onDrop?.(e)
        }
    }

    if (type === 'drag') {
        const buttonType = type
        return (
            <span>
                {renderUploadButton(buttonType)}
                {renderUploadList()}
            </span>
        )
    }

    if (listType === 'picture-card') {
        const buttonType = listType
        const pictureCardUploadButton = renderUploadButton(buttonType)

        return (
            <span className={cn(`${prefixCls}-picture-card-wrapper`, className)}>
                {renderUploadList(pictureCardUploadButton)}
            </span>
        )
    }

    const buttonType = listType === 'text' ? listType : 'basic'

    return (
        <span className={className}>
            {renderUploadButton(buttonType, children ? undefined : { display: 'none' })}
            {renderUploadList()}
        </span>
    )
}

export const Upload = InternalUpload as (<T>(
    props: React.PropsWithChildren<UploadProps<T>> & { ref?: React.Ref<any> },
) => React.ReactElement) & {
    displayName?: string
}

Upload.displayName = 'Upload'
