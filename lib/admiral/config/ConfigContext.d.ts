import { LogoType, OAuthProvidersEnum } from '../../admiral';
import React, { ReactNode } from 'react';
declare type ConfigContextValue = {
    logo?: LogoType;
    loginLogo?: LogoType;
    asideContent?: React.ReactNode;
    oauthProviders?: OAuthProvidersEnum[];
    menuPopupExtraComponents?: ReactNode;
};
export declare const ConfigContext: React.Context<ConfigContextValue>;
export declare const ConfigContextProvider: React.FC<{
    value: ConfigContextValue;
}>;
export declare function useConfig(): ConfigContextValue;
export {};
