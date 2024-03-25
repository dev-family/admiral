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
    }, dependencies)
}

export default useUpdateEffect
