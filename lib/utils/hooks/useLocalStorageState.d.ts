export default function useLocalStorageState<T>(key: string, options: {
    defaultValue: T;
}): [T, (value: T | ((prev: T) => T)) => void];
