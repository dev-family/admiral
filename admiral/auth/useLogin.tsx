import { useCallback } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useAuthProvider, defaultAuthParams } from './AuthContext'
import { RouterLocationState } from '../router/interfaces'

const useLogin = (): Login => {
    const authProvider = useAuthProvider()
    const { state: locationState } = useLocation<RouterLocationState>()
    const history = useHistory<RouterLocationState>()

    const nextPathName = locationState && locationState.nextPathname
    const nextSearch = locationState && locationState.nextSearch
    const nextRedirectTo = [nextPathName, nextSearch].filter(Boolean).join('')

    const login = useCallback(
        (params: any = {}, pathName) =>
            authProvider.login(params).then((res: any) => {
                const redirectUrl = pathName
                    ? pathName
                    : nextRedirectTo || defaultAuthParams.afterLoginUrl

                history.push(redirectUrl)
                return res
            }),
        [authProvider, history, nextPathName, nextSearch],
    )

    const loginWithoutProvider = useCallback(
        (_, __) => {
            history.push(defaultAuthParams.afterLoginUrl)
            return Promise.resolve()
        },
        [history],
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
