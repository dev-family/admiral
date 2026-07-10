import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthProvider, defaultAuthParams } from './AuthContext'
import useTypedLocation from '../router/useTypedLocation'

const useLogin = (): Login => {
    const authProvider = useAuthProvider()
    const { state: locationState } = useTypedLocation()
    const navigate = useNavigate()

    const nextPathName = locationState && locationState.nextPathname
    const nextSearch = locationState && locationState.nextSearch
    const nextRedirectTo = [nextPathName, nextSearch].filter(Boolean).join('')

    const login = useCallback(
        (params: any = {}, pathName: any) =>
            authProvider.login(params).then((res: any) => {
                const redirectUrl = pathName
                    ? pathName
                    : nextRedirectTo || defaultAuthParams.afterLoginUrl

                navigate(redirectUrl)
                return res
            }),
        [authProvider, navigate, nextPathName, nextSearch],
    )

    const loginWithoutProvider = useCallback(
        (_: any, __: any) => {
            navigate(defaultAuthParams.afterLoginUrl)
            return Promise.resolve()
        },
        [navigate],
    )

    return authProvider.isDefault ? loginWithoutProvider : login
}

/**
 * Log a user in by calling the authProvider.login() method
 *
 * @param {Object} params Login parameters to pass to the authProvider. May contain username/email, password, etc
 * @param {string} pathName The path to redirect to after login. By default, redirects to the home page, or to the last page visited after disconnection.
 *
 * @return {Promise} The authProvider response
 */
type Login = (params: any, pathName?: string) => Promise<any>

export default useLogin
