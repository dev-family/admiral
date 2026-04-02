import { LogoType } from '../ui/Layout/LayoutHeader';
import { OAuthProvidersEnum } from '../auth/interfaces';
import React, { ReactNode } from 'react';
type ConfigContextValue = {
    logo?: LogoType;
    loginLogo?: LogoType;
    asideContent?: React.ReactNode;
    oauthProviders?: OAuthProvidersEnum[];
    menuPopupExtraComponents?: ReactNode;
};
export declare const ConfigContext: React.Context<ConfigContextValue>;
export declare function ConfigContextProvider({ value, children, }: {
    value: ConfigContextValue;
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useConfig(): ConfigContextValue;
export {};
