export interface DebouncedFunction<A extends unknown[]> {
    (...args: A): void;
    cancel: () => void;
}
/**
 * Debounced wrapper with a stable identity (changes only with `delay`) that
 * always calls the latest `callback`. Pending calls are dropped on unmount.
 */
declare const useDebouncedCallback: <A extends unknown[]>(callback: (...args: A) => void, delay: number) => DebouncedFunction<A>;
export default useDebouncedCallback;
