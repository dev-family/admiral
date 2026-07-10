import { useEffect, useMemo, useRef } from 'react'
import useLatest from './useLatest'

export interface ThrottledFunction<A extends unknown[]> {
    (...args: A): void
    cancel: () => void
}

/**
 * Leading+trailing throttle with a stable identity (changes only with `delay`)
 * that always calls the latest `callback`. The trailing call fires with the
 * most recent arguments; pending calls are dropped on unmount.
 */
const useThrottledCallback = <A extends unknown[]>(
    callback: (...args: A) => void,
    delay: number,
): ThrottledFunction<A> => {
    const callbackRef = useLatest(callback)
    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
    const lastCallRef = useRef(0)
    const pendingArgsRef = useRef<A>(undefined as unknown as A)

    const throttled = useMemo(
        () =>
            Object.assign(
                (...args: A) => {
                    pendingArgsRef.current = args
                    const remaining = delay - (Date.now() - lastCallRef.current)
                    if (remaining <= 0) {
                        lastCallRef.current = Date.now()
                        callbackRef.current(...args)
                    } else if (!timerRef.current) {
                        timerRef.current = setTimeout(() => {
                            lastCallRef.current = Date.now()
                            timerRef.current = undefined
                            callbackRef.current(...pendingArgsRef.current)
                        }, remaining)
                    }
                },
                {
                    cancel: () => {
                        if (timerRef.current) {
                            clearTimeout(timerRef.current)
                            timerRef.current = undefined
                        }
                    },
                },
            ),
        [delay, callbackRef],
    )

    useEffect(() => () => throttled.cancel(), [throttled])

    return throttled
}

export default useThrottledCallback
