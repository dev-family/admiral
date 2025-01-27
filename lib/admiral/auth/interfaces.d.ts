/// <reference types="react" />
export declare enum OAuthProvidersEnum {
    Google = "Google",
    Github = "Github",
    Jira = "Jira"
}
export interface AuthProvider {
    login: (params: any) => Promise<any>;
    logout: (params: any) => Promise<void | false | string>;
    checkAuth: (params: any) => Promise<void>;
    getIdentity: () => Promise<UserIdentity>;
    oauthLogin?: (provider: OAuthProvidersEnum) => Promise<{
        redirect: string;
    }>;
    oauthCallback?: (provider: OAuthProvidersEnum, data: string) => Promise<any>;
    [key: string]: any;
}
export interface UserIdentity {
    id: string | number;
    fullName?: string;
    avatar?: string;
    email?: string;
    [key: string]: any;
}
export interface UserContextStateValue {
    loading: boolean;
    loaded: boolean;
    identity: UserIdentity | null;
    error?: any;
}
export interface UserContextValue {
    user: UserContextStateValue;
    setUser: React.Dispatch<React.SetStateAction<UserContextStateValue>>;
}
export interface AuthLocale {
    login: string;
    logout: string;
    oauth: string;
    password: string;
    email: string;
    notification: {
        success: string;
        error: string;
    };
}
