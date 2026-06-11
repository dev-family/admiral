import { useCallback, useEffect, useRef } from 'react'

/**
 * Race guard for async flows. `begin()` marks a new request and returns a
 * checker that stays true only while that request is the latest one, so
 * out-of-order responses can't overwrite newer state:
 *
 *   const beginRequest = useLatestRequest()
 *   const fetch = async () => {
 *       const isCurrent = beginRequest()
 *       const data = await api.load()
 *       if (isCurrent()) setData(data)
 *   }
 */
const useLatestRequest = () => {
    const seqRef = useRef(0)

    // Invalidate in-flight requests on unmount: late responses must not leak
    // into state owned by surviving ancestors (e.g. context providers).
    useEffect(
        () => () => {
            seqRef.current += 1
        },
        [],
    )

    return useCallback(() => {
        const seq = ++seqRef.current
        return () => seq === seqRef.current
    }, [])
}

export default useLatestRequest
