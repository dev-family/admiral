import type { DependencyList, EffectCallback } from 'react'
import { useEffect, useRef } from 'react'

const useUpdateEffect = (callback: EffectCallback, dependencies: DependencyList) => {
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
        } else {
            return callback()
        }
        // The caller owns the dependency list, like with a plain useEffect.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies)
}

export default useUpdateEffect
