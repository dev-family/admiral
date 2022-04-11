declare const useLogout: () => Logout
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
declare type Logout = (
    params?: any,
    redirectTo?: string,
    redirectToCurrentLocationAfterLogin?: boolean,
) => Promise<any>
export default useLogout
