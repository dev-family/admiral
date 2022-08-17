import React from 'react';
import { UserContextValue } from './interfaces';
export declare const UserContext: React.Context<UserContextValue>;
export declare const UserContextProvider: React.FC;
export declare function useUserContext(): UserContextValue;
