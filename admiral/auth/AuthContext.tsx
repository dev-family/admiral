import React, { createContext, useContext, useMemo } from 'react'
import { AuthProvider } from './interfaces'

export const defaultAuthParams = {
    loginUrl: '/login',
    afterLoginUrl: '/',
}

const defaultProvider: AuthProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    getIdentity: () => Promise.reject(),
    oauthLogin: () => Promise.reject(),
    oauthCallback: () => Promise.resolve(),
}

type AuthContextValue = AuthProvider & { isDefault: boolean }

export const AuthContext = createContext<AuthContextValue>({
    ...defaultProvider,
    isDefault: true,
})
AuthContext.displayName = 'AuthContext'

export const AuthContextProvider: React.FC<{ value?: AuthProvider }> = ({ value, children }) => {
    const contextValue = useMemo(
        () => (value ? { ...value, isDefault: false } : { ...defaultProvider, isDefault: true }),
        [value],
    )
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuthProvider() {
    return useContext(AuthContext)
}
