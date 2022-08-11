import { useCallback } from 'react'
import { useAuthProvider, defaultAuthParams } from './AuthContext'
import { useHistory } from 'react-router-dom'
import { LocationDescriptorObject } from 'history'
import { RouterLocationState } from '../router/interfaces'

const useLogout = (): Logout => {
    const authProvider = useAuthProvider()

    /**
     * We need the current location to pass in the router state
     * so that the login hook knows where to redirect to as next route after login.
     */
    const history = useHistory<RouterLocationState>()

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
                // we must split the redirectTo to pass a structured location to history.push()
                const redirectToParts = (redirectToFromProvider || redirectTo).split('?')
                const newLocation: LocationDescriptorObject<RouterLocationState> = {
                    pathname: redirectToParts[0],
                }
                if (
                    redirectToCurrentLocationAfterLogin &&
                    history.location &&
                    history.location.pathname
                ) {
                    newLocation.state = {
                        nextPathname: history.location.pathname,
                        nextSearch: history.location.search,
                    }
                }
                if (redirectToParts[1]) {
                    newLocation.search = redirectToParts[1]
                }
                history.push(newLocation)

                return redirectToFromProvider
            }),
        [authProvider, history],
    )

    const logoutWithoutProvider = useCallback(
        (_) => {
            history.push({
                pathname: defaultAuthParams.loginUrl,
                state: {
                    nextPathname: history.location && history.location.pathname,
                },
            })
            return Promise.resolve()
        },
        [history],
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
