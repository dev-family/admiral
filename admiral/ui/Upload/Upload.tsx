import React, { useMemo, useState } from 'react'
import { OnDragEndResponder } from 'react-beautiful-dnd'
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

const InternalUpload: React.ForwardRefRenderFunction<unknown, UploadProps> = (props, ref) => {
    const {
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
        type,
        itemRender,
        maxCount,
        isDraggable,
    } = props
    const [dragState, setDragState] = useState<string>('drop')
    const [mergedFileList, setMergedFileList] = useMergedState([], {
        value: fileList,
        postState: (list) => list ?? [],
    })

    const upload = React.useRef<any>()

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
        onInternalChange(file, fileListArgs)
        return false
    }

    const handleRemove = (file: UploadFile) => {
        const removedFileList = removeFileItem(file, mergedFileList)

        if (removedFileList) {
            onInternalChange({ ...file, status: 'removed' }, removedFileList)
        }
    }
    const onDragEnd: OnDragEndResponder = (data) => {
        if (!data.destination) return

        const startIndex = data.source.index
        const endIndex = data.destination.index

        const fileListCopy = [...mergedFileList]
        const [movedFile] = fileListCopy.splice(startIndex, 1)
        fileListCopy.splice(endIndex, 0, movedFile)
        const result = fileListCopy.map((file, index) => Object.assign(file, { order: index }))
        const changeInfo: UploadChangeParam<UploadFile> = {
            file: mergedFileList[data.source.index] as UploadFile,
            fileList: result,
        }
        // setMergedFileList(result)
        onChange?.(changeInfo)
    }

    const prefixCls = cn('upload')

    const rcUploadProps = {
        ...(props as RcUploadProps),
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
                    onDragEnd={isDraggable ? onDragEnd : undefined}
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

export const Upload = React.forwardRef<unknown, UploadProps>(InternalUpload) as (<T>(
    props: React.PropsWithChildren<UploadProps<T>> & React.RefAttributes<any>,
) => React.ReactElement) & {
    defaultProps?: Partial<UploadProps>
    displayName?: string
}

Upload.displayName = 'Upload'

Upload.defaultProps = {
    type: 'select',
    multiple: false,
    fileList: [],
    data: {},
    accept: '',
    showUploadList: true,
    listType: 'picture',
    className: '',
    disabled: false,
}
