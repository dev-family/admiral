import { useRef } from 'react'

/**
 * Always-current ref: lets stable callbacks and one-shot effects read the
 * latest value without re-subscribing on every change.
 */
const useLatest = <T>(value: T) => {
    const ref = useRef(value)
    ref.current = value

    return ref
}

export default useLatest
