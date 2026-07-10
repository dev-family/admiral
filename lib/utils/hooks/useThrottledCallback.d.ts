export interface ThrottledFunction<A extends unknown[]> {
    (...args: A): void;
    cancel: () => void;
}
/**
 * Leading+trailing throttle with a stable identity (changes only with `delay`)
 * that always calls the latest `callback`. The trailing call fires with the
 * most recent arguments; pending calls are dropped on unmount.
 */
declare const useThrottledCallback: <A extends unknown[]>(callback: (...args: A) => void, delay: number) => ThrottledFunction<A>;
export default useThrottledCallback;
