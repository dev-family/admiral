import React, { useCallback } from 'react'
import { defaultAuthParams, useAuthProvider } from './AuthContext'
import useLogout from './useLogout'

type CheckAuth = (params?: any, logoutOnFailure?: boolean, redirectTo?: string) => Promise<any>

const useCheckAuth = (): CheckAuth => {
    const authProvider = useAuthProvider()
    const logout = useLogout()

    const checkAuth = useCallback(
        (params: any = {}, logoutOnFailure = true, redirectTo = defaultAuthParams.loginUrl) =>
            authProvider.checkAuth(params).catch((error) => {
                if (logoutOnFailure) {
                    logout({}, error && error.redirectTo ? error.redirectTo : redirectTo)
                }
                throw error
            }),
        [authProvider],
    )

    return authProvider.isDefault ? checkAuthWithoutAuthProvider : checkAuth
}

const checkAuthWithoutAuthProvider = () => Promise.resolve()

export default useCheckAuth
