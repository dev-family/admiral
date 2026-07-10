import { useState, useCallback } from 'react'

export default function useLocalStorageState<T>(
    key: string,
    options: { defaultValue: T },
): [T, (value: T | ((prev: T) => T)) => void] {
    const [state, setState] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key)
            return item !== null ? JSON.parse(item) : options.defaultValue
        } catch {
            return options.defaultValue
        }
    })

    const setValue = useCallback(
        (value: T | ((prev: T) => T)) => {
            setState((prev) => {
                const next = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value
                try {
                    localStorage.setItem(key, JSON.stringify(next))
                } catch {
                    // quota exceeded or security error — state still updates
                }
                return next
            })
        },
        [key],
    )

    return [state, setValue]
}
