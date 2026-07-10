import { useCallback } from 'react'
import { defaultAuthParams, useAuthProvider } from './AuthContext'
import useLogout from './useLogout'
import { useLatest } from '../utils/hooks'

type CheckAuth = (params?: any, logoutOnFailure?: boolean, redirectTo?: string) => Promise<any>

const useCheckAuth = (): CheckAuth => {
    const authProvider = useAuthProvider()
    const logout = useLogout()

    // Latest-ref keeps checkAuth's identity stable across navigations while
    // still logging out with the current location.
    const logoutRef = useLatest(logout)

    const checkAuth = useCallback(
        (params: any = {}, logoutOnFailure = true, redirectTo = defaultAuthParams.loginUrl) =>
            authProvider.checkAuth(params).catch((error) => {
                if (logoutOnFailure) {
                    logoutRef.current({}, error && error.redirectTo ? error.redirectTo : redirectTo)
                }
                throw error
            }),
        [authProvider, logoutRef],
    )

    return authProvider.isDefault ? checkAuthWithoutAuthProvider : checkAuth
}

const checkAuthWithoutAuthProvider = () => Promise.resolve()

export default useCheckAuth
