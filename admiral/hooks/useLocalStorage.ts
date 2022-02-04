import React, { useState, useCallback } from 'react'

type Function<A = any[], B = any> = (...args: A extends any[] ? A : [A]) => B

export default function useLocalStorage<T>(
    key: string,
    initialValue: T,
): [storedValue: T, setValue: (value: T | Function<T, void>) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key)

            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.log('useLocalStorage hook init error: ', error)
            return initialValue
        }
    })

    const setValue = useCallback((value: T | Function) => {
        try {
            // Allow value to be a function so we have same API as useState
            let valueToStore

            setStoredValue((prev) => {
                valueToStore = value instanceof Function ? value(prev) : value
                return valueToStore
            })
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.log('useLocalStorage hook setValue error: ', error)
        }
    }, [])

    return [storedValue, setValue]
}
