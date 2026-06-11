/**
 * Race guard for async flows. `begin()` marks a new request and returns a
 * checker that stays true only while that request is the latest one, so
 * out-of-order responses can't overwrite newer state:
 *
 *   const beginRequest = useLatestRequest()
 *   const fetch = async () => {
 *       const isCurrent = beginRequest()
 *       const data = await api.load()
 *       if (isCurrent()) setData(data)
 *   }
 */
declare const useLatestRequest: () => () => () => boolean;
export default useLatestRequest;
