import { UserIdentity } from './interfaces'
interface GetIdentityState {
    loading: boolean
    loaded: boolean
    identity: UserIdentity | null
    error?: any
}
/**
 * Return the current user identity by calling authProvider.getIdentity() on mount
 */
declare const useGetIdentity: () => GetIdentityState
export default useGetIdentity
