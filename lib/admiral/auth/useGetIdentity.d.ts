/**
 * Return the current user identity by calling authProvider.getIdentity() on mount
 */
declare const useGetIdentity: () => import("./interfaces").UserContextStateValue;
export default useGetIdentity;
