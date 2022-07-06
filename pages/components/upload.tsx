import React, { useReducer, Reducer } from 'react'
import { FiUpload, FiImage } from 'react-icons/fi'
import { Page, Upload, Button } from '../../admiral'
import { UploadProps, UploadFile } from '../../admiral/ui/Upload/interfaces'
const { Dragger } = Upload

const draggerCustomStyles: any = {
    uploadStyleExample: {
        cursor: 'pointer',
        maxWidth: '500px',
        padding: '16px',
        border: '1px dotted',
        borderColor: 'grey',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    uploadStyleExample_Img: {
        marginBottom: '5px',
    },
    uploadStyleExample_Text: {
        marginBottom: '5px',
    },
    svg: {
        width: '50px',
        height: '50px',
        color: 'grey',
    },
}

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

    return (
        <Page title="Upload">
            <div
                style={{
                    display: 'grid',
                    gridGap: '24px',
                }}
            >
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
                <h2>Default draggable</h2>
                <Dragger
                    onDrop={(e) => {
                        console.log('drop event', e)
                    }}
                    multiple
                    fileList={fileListMultiple}
                    onChange={updateFileListMultiple}
                />
                <h2>Custom draggable (disabled)</h2>
                <Dragger
                    multiple
                    fileList={fileListMultiple}
                    onChange={updateFileListMultiple}
                    className="custom-upload-drag"
                    disabled
                >
                    <div style={draggerCustomStyles.uploadStyleExample_Img}>
                        <FiImage style={draggerCustomStyles.svg} />
                    </div>
                    <p style={draggerCustomStyles.uploadStyleExample_Text}>
                        Click or drag file to this area to upload
                    </p>
                    <p style={draggerCustomStyles.uploadStyleExample_Text}>MY CUSTOM LAYOUT</p>
                </Dragger>
            </div>
        </Page>
    )
}
