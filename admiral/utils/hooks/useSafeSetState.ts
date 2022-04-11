import React, { useState, useEffect, useRef, useCallback } from 'react'

export default function useSafeSetState<T>(
    initialState: T | (() => T),
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState(initialState)

    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    const safeSetState = useCallback(
        (args) => {
            if (mountedRef.current) {
                return setState(args)
            }
        },
        [mountedRef, setState],
    )

    return [state, safeSetState]
}
