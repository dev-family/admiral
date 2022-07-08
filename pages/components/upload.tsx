import React, { useReducer, Reducer } from 'react'
import { FiUpload } from 'react-icons/fi'
import { Page, Upload, Button } from '../../admiral'
import { UploadProps, UploadFile } from '../../admiral/ui/Upload/interfaces'

export default function UploadPage() {
    const [fileList, updateFileList] = useReducer<
        Reducer<UploadFile[], { fileList: UploadProps['fileList']; file: UploadFile }>
    >(
        (_state, { file, fileList }) => {
            console.log('CHANGE: ', file, fileList)
            return fileList || []
        },
        [
            {
                uid: '-1',
                name: 'test_image.JPG',
                type: 'image/jpg',
                url: 'https://picsum.photos/400/600',
            },
            {
                uid: '1',
                name: 'test_image.JPG',
                type: 'image/jpg',
                status: 'error',
                url: 'https://picsum.photos/600/400',
            },
        ],
    )

    const [fileListMultiple, updateFileListMultiple] = useReducer<
        Reducer<UploadFile[], { fileList: UploadProps['fileList']; file: UploadFile }>
    >((_state, { file, fileList }) => {
        console.log('CHANGE: ', file, fileList)
        return fileList || []
    }, [])

    const [fileListSingle, updateSingle] = useReducer<
        Reducer<UploadFile[], { fileList: UploadProps['fileList']; file: UploadFile }>
    >((_state, { file, fileList }) => {
        console.log('CHANGE: ', file, fileList)
        return fileList || []
    }, [])

    const handlePreview = async (file: UploadFile) => {
        console.log('handlePreview file', file)
    }

    return (
        <Page title="Upload">
            <div
                style={{
                    display: 'grid',
                    gridGap: '24px',
                }}
            >
                <h2>Picture list</h2>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={updateFileList}
                >
                    {fileList.length >= 8 ? null : (
                        <Button iconLeft={<FiUpload />}>Click to Upload</Button>
                    )}
                </Upload>
                <h2>Default</h2>
                <Upload fileList={fileList} onChange={updateFileList}>
                    <Button iconLeft={<FiUpload />}>Click to Upload</Button>
                </Upload>
                <h2>Disabled</h2>
                <Upload disabled fileList={fileList} onChange={updateFileList}>
                    <Button disabled iconLeft={<FiUpload />}>
                        Click to Upload
                    </Button>
                </Upload>
                <h2>Multiple / accept video & image & pdf</h2>
                <Upload
                    fileList={fileListMultiple}
                    multiple
                    onChange={updateFileListMultiple}
                    accept="video/*,image/*,.pdf"
                >
                    <Button iconLeft={<FiUpload />}>Click to Upload</Button>
                </Upload>
                <h2>Max count = 1</h2>
                <Upload
                    fileList={fileListSingle}
                    onChange={updateSingle}
                    accept="video/*,image/*,.pdf"
                    maxCount={1}
                >
                    <Button iconLeft={<FiUpload />}>Click to Upload</Button>
                </Upload>
            </div>
        </Page>
    )
}
