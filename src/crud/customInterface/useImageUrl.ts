import { useState, useEffect } from 'react'

export const readFile = async (image: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            resolve(reader.result as string)
        }
        reader.onerror = reject
        reader.readAsDataURL(image)
    })
}

const useImageUrl = (file: Blob) => {
    const [url, setUrl] = useState<string>('')

    useEffect(() => {
        if (file) {
            try {
                readFile(file).then((result) => setUrl(result as string))
            } catch {
                /* ignore read errors */
            }
        } else {
            setUrl('')
        }
    }, [file])

    return url
}

export default useImageUrl
