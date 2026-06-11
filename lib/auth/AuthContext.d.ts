import React from 'react';
import { AuthProvider } from './interfaces.js';
export declare const defaultAuthParams: {
    loginUrl: string;
    afterLoginUrl: string;
};
type AuthContextValue = AuthProvider & {
    isDefault: boolean;
};
export declare const AuthContext: React.Context<AuthContextValue>;
export declare function AuthContextProvider({ value, children, }: {
    value?: AuthProvider;
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useAuthProvider(): AuthContextValue;
export {};
