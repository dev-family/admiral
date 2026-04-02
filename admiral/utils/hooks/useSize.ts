import { useState, useEffect } from 'react'

interface Size {
    width: number
    height: number
}

export default function useSize(target: React.RefObject<HTMLElement | null>): Size | undefined {
    const [size, setSize] = useState<Size | undefined>(() => {
        const el = target.current
        return el ? { width: el.clientWidth, height: el.clientHeight } : undefined
    })

    useEffect(() => {
        const el = target.current
        if (!el) return

        setSize({ width: el.clientWidth, height: el.clientHeight })

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0]
            if (entry) {
                const { width, height } = entry.contentRect
                setSize({ width, height })
            }
        })

        observer.observe(el)
        return () => observer.disconnect()
    }, [target])

    return size
}
