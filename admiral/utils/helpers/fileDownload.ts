import axios from 'axios'
import { UploadFile } from '../../ui/Upload/interfaces'
import { Notification } from '../../ui'

export default async function internalDownloadFile(file: UploadFile) {
    try {
        const fileName = file?.name
        const fileNameHasExtension = (fileName && fileName.split('.')[1]) || null
        let fileType = getFileType(file?.type)
        const fileBlob = await axios.get(file?.url || '', { responseType: 'blob' })
        if (!fileType) fileType = getFileType(fileBlob?.data?.type)
        const downloadName = fileNameHasExtension ? fileName : `download_file.${fileType}`
        saveBlob(fileBlob.data, downloadName)
    } catch (error: any) {
        const { statusText, status } = error?.response ?? {}
        Notification({
            message: `error status: ${status}, message: ${statusText || 'unknown'}`,
            type: 'error',
        })
    }
}

function saveBlob(blob: Blob, filename?: string) {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename || 'download'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

function getFileType(fileType?: string) {
    return (fileType && fileType.split('/')[1]) || null
}
