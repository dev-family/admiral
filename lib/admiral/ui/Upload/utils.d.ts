import { RcFile, UploadFile } from './interfaces'
/** Upload fileList. Replace file if exist or just push into it. */
export declare function updateFileList(file: UploadFile, fileList: UploadFile[]): UploadFile[]
export declare function getFileItem(file: RcFile, fileList: UploadFile[]): UploadFile
export declare function removeFileItem(
    file: UploadFile,
    fileList: UploadFile[],
): UploadFile[] | null
export declare const isImageUrl: (file: UploadFile) => boolean
export declare const isVideoUrl: (file: UploadFile) => boolean
export declare function previewImage(file: File | Blob): Promise<string>
