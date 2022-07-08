import React, { useMemo, useState } from 'react'
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

const InternalUpload: React.ForwardRefRenderFunction<unknown, UploadProps> = (props, ref) => {
    const {
        fileList,
        showUploadList = true,
        listType,
        onChange,
        onPreview,
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

    const renderUploadList = () => {
        const { showRemoveIcon, showPreviewIcon } =
            typeof showUploadList === 'boolean' ? ({} as ShowUploadListInterface) : showUploadList
        return showUploadList ? (
            <>
                <UploadList
                    listType={listType}
                    items={mergedFileList}
                    onRemove={handleRemove}
                    onPreview={onPreview}
                    showRemoveIcon={!disabled && showRemoveIcon}
                    showPreviewIcon={showPreviewIcon}
                    locale={locale}
                    isImageUrl={isImageUrl}
                    itemRender={itemRender}
                />
            </>
        ) : null
    }

    const renderUploadButton = (uploadButtonStyle?: React.CSSProperties) => (
        <div className={styles.buttonWrap} style={uploadButtonStyle}>
            <RcUpload {...rcUploadProps} ref={upload} />
        </div>
    )

    const onFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        setDragState(e.type)

        if (e.type === 'drop') {
            onDrop?.(e)
        }
    }

    if (type === 'drag') {
        const dragCls = cn(
            prefixCls,
            {
                [`${prefixCls}-drag`]: true,
                [`${prefixCls}-drag-uploading`]: mergedFileList.some(
                    (file) => file?.status === 'uploading',
                ),
                [`${prefixCls}-drag-hover`]: dragState === 'dragover',
                [`${prefixCls}-disabled`]: disabled,
            },
            className,
        )
        return (
            <span>
                <div
                    className={dragCls}
                    onDrop={onFileDrop}
                    onDragOver={onFileDrop}
                    onDragLeave={onFileDrop}
                    style={style}
                >
                    <RcUpload {...rcUploadProps} ref={upload} className={`${prefixCls}-btn`}>
                        <div className={`${prefixCls}-drag-container`}>{children}</div>
                    </RcUpload>
                </div>
                {renderUploadList()}
            </span>
        )
    }

    return (
        <span className={className}>
            {renderUploadButton(children ? undefined : { display: 'none' })}
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
