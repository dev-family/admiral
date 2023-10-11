import { MutableRefObject, useCallback, useRef } from 'react'

export default function useDebounce(callback: (...args: any[]) => void, delay: number) {
    const timer = useRef() as MutableRefObject<any>

    return useCallback(
        (...args: any[]) => {
            if (timer.current) {
                clearTimeout(timer.current)
            }
            timer.current = setTimeout(() => {
                callback(...args)
            }, delay)
        },
        [callback, delay],
    )
}
