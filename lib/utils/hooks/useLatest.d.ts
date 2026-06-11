/**
 * Always-current ref: lets stable callbacks and one-shot effects read the
 * latest value without re-subscribing on every change.
 */
declare const useLatest: <T>(value: T) => import("react").RefObject<T>;
export default useLatest;
