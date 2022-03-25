declare type Function<A = any[], B = any> = (...args: A extends any[] ? A : [A]) => B
export default function useLocalStorage<T>(
    key: string,
    initialValue: T,
): [storedValue: T, setValue: (value: T | Function<T, void>) => void]
export {}
