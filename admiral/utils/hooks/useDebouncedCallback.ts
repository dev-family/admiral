import { useEffect, useMemo, useRef } from 'react'
import useLatest from './useLatest'

export interface DebouncedFunction<A extends unknown[]> {
    (...args: A): void
    cancel: () => void
}

/**
 * Debounced wrapper with a stable identity (changes only with `delay`) that
 * always calls the latest `callback`. Pending calls are dropped on unmount.
 */
const useDebouncedCallback = <A extends unknown[]>(
    callback: (...args: A) => void,
    delay: number,
): DebouncedFunction<A> => {
    const callbackRef = useLatest(callback)
    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

    const debounced = useMemo(
        () =>
            Object.assign(
                (...args: A) => {
                    clearTimeout(timerRef.current)
                    timerRef.current = setTimeout(() => callbackRef.current(...args), delay)
                },
                {
                    cancel: () => clearTimeout(timerRef.current),
                },
            ),
        [delay, callbackRef],
    )

    useEffect(() => () => debounced.cancel(), [debounced])

    return debounced
}

export default useDebouncedCallback
