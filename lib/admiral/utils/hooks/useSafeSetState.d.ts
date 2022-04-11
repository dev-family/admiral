import React from 'react'
export default function useSafeSetState<T>(
    initialState: T | (() => T),
): [T, React.Dispatch<React.SetStateAction<T>>]
