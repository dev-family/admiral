import React from 'react';
import { UserContextValue } from './interfaces';
export declare const UserContext: React.Context<UserContextValue>;
export declare function UserContextProvider({ children }: {
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useUserContext(): UserContextValue;
