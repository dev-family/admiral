import { useCallback } from 'react'
import { useAuthProvider, defaultAuthParams } from './AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { RouterLocationState } from '../router/interfaces'

const useLogout = (): Logout => {
    const authProvider = useAuthProvider()

    /**
     * We need the current location to pass in the router state
     * so that the login hook knows where to redirect to as next route after login.
     */
    const navigate = useNavigate()
    const location = useLocation()

    const logout = useCallback(
        (
            params = {},
            redirectTo = defaultAuthParams.loginUrl,
            redirectToCurrentLocationAfterLogin = true,
        ) =>
            authProvider.logout(params).then((redirectToFromProvider) => {
                if (redirectToFromProvider === false) {
                    return
                }
                // redirectTo can contain a query string, e.g. '/login?foo=bar'
                // we must split the redirectTo to pass a structured location to navigate()
                const redirectToParts = (redirectToFromProvider || redirectTo).split('?')
                const newPathname = redirectToParts[0]
                let state: RouterLocationState | undefined
                if (redirectToCurrentLocationAfterLogin && location && location.pathname) {
                    state = {
                        nextPathname: location.pathname,
                        nextSearch: location.search,
                    }
                }
                const search = redirectToParts[1] ? redirectToParts[1] : undefined
                navigate({ pathname: newPathname, search }, { state })
                window.location.reload()

                return redirectToFromProvider
            }),
        [authProvider, navigate, location],
    )

    const logoutWithoutProvider = useCallback(
        (_: any) => {
            navigate(
                { pathname: defaultAuthParams.loginUrl },
                {
                    state: {
                        nextPathname: location && location.pathname,
                    },
                },
            )
            return Promise.resolve()
        },
        [navigate, location],
    )

    return authProvider.isDefault ? logoutWithoutProvider : logout
}

/**
 * Log the current user out by calling the authProvider.logout() method,
 * and redirect them to the login screen.
 *
 * @param {Object} params The parameters to pass to the authProvider
 * @param {string} redirectTo The path name to redirect the user to (optional, defaults to login)
 * @param {boolean} redirectToCurrentLocationAfterLogin Whether the button shall record the current location to redirect to it after login. true by default.
 *
 * @return {Promise} The authProvider response
 */
type Logout = (
    params?: any,
    redirectTo?: string,
    redirectToCurrentLocationAfterLogin?: boolean,
) => Promise<any>

export default useLogout
