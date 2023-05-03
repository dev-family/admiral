import fileDownload from 'js-file-download'
import axios from 'axios'
import { UploadFile } from '../../ui/Upload/interfaces'
import { Notification } from '../../ui'

export default async function internalDownloadFile(file: UploadFile) {
    try {
        const fileName = file?.name
        const fileNameHasExtension = (fileName && fileName.split('.')[1]) || null
        let fileType = getFileType(file?.type)
        const fileBlob = await axios.get(file?.url || '', { responseType: 'blob' })
        !fileType && (fileType = getFileType(fileBlob?.data?.type))
        return fileDownload(
            fileBlob.data,
            fileNameHasExtension ? fileName : `download_file.${fileType}`,
        )
    } catch (error: any) {
        const { statusText, status } = error?.response
        Notification({
            message: `error status: ${status}, message: ${statusText || 'unknown'}`,
            type: 'error',
        })
        console.log('file download error', error.response)
    }
}

function getFileType(fileType?: string) {
    return (fileType && fileType.split('/')[1]) || null
}
