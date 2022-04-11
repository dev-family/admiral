import React from 'react'
import { AuthProvider } from './interfaces'
export declare const defaultAuthParams: {
    loginUrl: string
    afterLoginUrl: string
}
declare type AuthContextValue = AuthProvider & {
    isDefault: boolean
}
export declare const AuthContext: React.Context<AuthContextValue>
export declare const AuthContextProvider: React.FC<{
    value?: AuthProvider
}>
export declare function useAuthProvider(): AuthContextValue
export {}
