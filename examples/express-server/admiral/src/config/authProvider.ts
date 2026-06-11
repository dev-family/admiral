import { AuthProvider } from '@devfamily/admiral'
import _ from './request'

export const tokenStorageKey = 'admiral_global_admin_session_token'
export const storage = {
    get: (name: string) => {
        return localStorage.getItem(name)
    },
    set: (name: string, value: string) => {
        return localStorage.setItem(name, value)
    },
    remove: (name: string) => {
        return localStorage.removeItem(name)
    },
}

const authProvider = (apiUrl: string): AuthProvider => ({
    login: ({ email, password }) => {
        const url = `${apiUrl}/auth/login`
        return _.post(url)({ data: { email, password } }).then(({ token }) => {
            storage.set(tokenStorageKey, token)
        })
    },
    checkAuth: ({ token }) => {
        const url = `${apiUrl}/auth/check-auth`

        if (storage.get(tokenStorageKey)) {
            return _.get(url)({ data: { token } })
        } else {
            return Promise.reject()
        }
    },
    logout: () => {
        const url = `${apiUrl}/auth/logout`
        return _.post(url)().then(() => {
            storage.remove(tokenStorageKey)
        })
    },
    getIdentity: () => {
        const url = `${apiUrl}/auth/get-identity`

        return _.get(url)()
            .catch(() => {
                storage.remove(tokenStorageKey)
                return Promise.reject(new Error('Your session has expired. Please login again.'))
            })
            .then(({ user }) => {
                return { ...user, fullName: user.name }
            })
    },
})

export default authProvider
