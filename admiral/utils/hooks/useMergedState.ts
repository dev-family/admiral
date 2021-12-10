import React, { useState, useEffect, useRef, useCallback } from 'react'

export default function useControlledState<T, R = T>(
    defaultStateValue: T | (() => T),
    option?: {
        defaultValue?: T | (() => T)
        value?: T
        onChange?: (value: T, prevValue: T) => void
        postState?: (value: T) => T
    },
): [R, (value: T) => void] {
    const { defaultValue, value, onChange, postState } = option || {}
    const [innerValue, setInnerValue] = useState<T>(() => {
        if (value !== undefined) {
            return value
        }
        if (defaultValue !== undefined) {
            return typeof defaultValue === 'function' ? (defaultValue as any)() : defaultValue
        }
        return typeof defaultStateValue === 'function'
            ? (defaultStateValue as any)()
            : defaultStateValue
    })

    let mergedValue = value !== undefined ? value : innerValue
    if (postState) {
        mergedValue = postState(mergedValue)
    }

    // setState
    const onChangeRef = useRef(onChange)
    onChangeRef.current = onChange

    const triggerChange = useCallback(
        (newValue: T) => {
            setInnerValue(newValue)
            if (mergedValue !== newValue && onChangeRef.current) {
                onChangeRef.current(newValue, mergedValue)
            }
        },
        [mergedValue, onChangeRef],
    )

    // Effect of reset value to `undefined`
    const firstRenderRef = useRef(true)
    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false
            return
        }

        if (value === undefined) {
            setInnerValue(value!)
        }
    }, [value])

    return [mergedValue as unknown as R, triggerChange]
}
