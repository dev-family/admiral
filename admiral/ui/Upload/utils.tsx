import { RcFile, UploadFile } from './interfaces'

/** Upload fileList. Replace file if exist or just push into it. */
export function updateFileList(file: UploadFile, fileList: UploadFile[]) {
    const nextFileList = [...fileList]
    const fileIndex = nextFileList.findIndex(({ uid }: UploadFile) => uid === file.uid)
    if (fileIndex === -1) {
        nextFileList.push(file)
    } else {
        nextFileList[fileIndex] = file
    }
    return nextFileList
}

export function getFileItem(file: RcFile, fileList: UploadFile[]) {
    const matchKey = file.uid !== undefined ? 'uid' : 'name'
    return fileList.filter((item) => item[matchKey] === file[matchKey])[0]
}

export function removeFileItem(file: UploadFile, fileList: UploadFile[]) {
    const matchKey = file.uid !== undefined ? 'uid' : 'name'
    const removed = fileList.filter((item) => item[matchKey] !== file[matchKey])
    if (removed.length === fileList.length) {
        return null
    }
    return removed
}

// ==================== Default Image Preview ====================
const extname = (url: string = '') => {
    const temp = url.split('/')
    const filename = temp[temp.length - 1]
    const filenameWithoutSuffix = filename.split(/#|\?/)[0]
    return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0]
}

const isImageFileType = (type: string): boolean => type.indexOf('image/') === 0

export const isImageUrl = (file: UploadFile): boolean => {
    if (file.type && !file.thumbUrl) {
        return isImageFileType(file.type)
    }
    const url: string = (file.thumbUrl || file.url || '') as string
    const extension = extname(url)
    if (
        /^data:image\//.test(url) ||
        /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(extension)
    ) {
        return true
    }
    if (/^data:/.test(url)) {
        // other file types of base64
        return false
    }
    if (extension) {
        // other file types which have extension
        return false
    }
    return true
}

const isVideoFileType = (type: string): boolean => type.indexOf('video/') === 0

export const isVideoUrl = (file: UploadFile): boolean => {
    if (file.type && !file.thumbUrl) {
        return isVideoFileType(file.type)
    }
    const url: string = (file.thumbUrl || file.url || '') as string
    const extension = extname(url)
    if (/(avi|mp4|webm|ogm|ogv|ogg)$/i.test(extension)) {
        return true
    }
    if (extension) {
        // other file types which have extension
        return false
    }
    return true
}

const MEASURE_SIZE = 200
export function previewImage(file: File | Blob): Promise<string> {
    return new Promise((resolve) => {
        if (!file.type || !isImageFileType(file.type)) {
            resolve('')
            return
        }

        const canvas = document.createElement('canvas')
        canvas.width = MEASURE_SIZE
        canvas.height = MEASURE_SIZE
        canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${MEASURE_SIZE}px; height: ${MEASURE_SIZE}px; z-index: 9999; display: none;`
        document.body.appendChild(canvas)
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.onload = () => {
            drawImageWithCover(ctx!, img, 0, 0, MEASURE_SIZE, MEASURE_SIZE)
            const dataURL = canvas.toDataURL()
            document.body.removeChild(canvas)

            resolve(dataURL)
        }
        img.src = window.URL.createObjectURL(file)
    })
}

function drawImageWithCover(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number,
    offsetX?: number,
    offsetY?: number,
) {
    if (arguments.length === 2) {
        x = y = 0
        w = ctx.canvas.width
        h = ctx.canvas.height
    }

    // default offset is center
    offsetX = typeof offsetX === 'number' ? offsetX : 0.5
    offsetY = typeof offsetY === 'number' ? offsetY : 0.5

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0
    if (offsetY < 0) offsetY = 0
    if (offsetX > 1) offsetX = 1
    if (offsetY > 1) offsetY = 1

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r, // new prop. width
        nh = ih * r, // new prop. height
        cx,
        cy,
        cw,
        ch,
        ar = 1

    // decide which gap to fill
    if (nw < w) ar = w / nw
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh // updated
    nw *= ar
    nh *= ar

    // calc source rectangle
    cw = iw / (nw / w)
    ch = ih / (nh / h)

    cx = (iw - cw) * offsetX
    cy = (ih - ch) * offsetY

    // make sure source rectangle is valid
    if (cx < 0) cx = 0
    if (cy < 0) cy = 0
    if (cw > iw) cw = iw
    if (ch > ih) ch = ih

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h)
}
