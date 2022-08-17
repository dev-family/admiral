import { AuthProvider } from '../admiral/auth/interfaces'
import _ from './request'

export const tokenStorageKey = 'df_admin_session_token'
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
    login: ({ username, password }) => {
        const url = `${apiUrl}/login`
        return _.post(url)({ data: { username, password } }).then(({ data }) => {
            storage.set(tokenStorageKey, data.token)
        })
    },
    checkAuth: () => {
        const token = storage.get(tokenStorageKey)
        if (!!token) {
            return Promise.resolve()
        } else {
            return Promise.reject()
        }
    },
    logout: () => {
        const url = `${apiUrl}/logout`
        return _.post(url)().then(() => {
            storage.remove(tokenStorageKey)
        })
    },
    getIdentity: () => {
        const url = `${apiUrl}/getIdentity`
        return _.get(url)()
    },
})

export default authProvider
