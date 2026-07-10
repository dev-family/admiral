/**
 * Return the current user identity by calling authProvider.getIdentity() on mount
 */
declare const useGetIdentity: () => import("./interfaces.js").UserContextStateValue;
export default useGetIdentity;
