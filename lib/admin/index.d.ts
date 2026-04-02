import '../assets/global.css';
import React, { ComponentType, ReactNode } from 'react';
import { LogoType } from '../ui/Layout/LayoutHeader';
import { DataProvider } from '../dataProvider';
import type { AuthProvider } from '../auth/interfaces';
import { ThemePreset } from '../theme/interfaces';
import { OAuthProvidersEnum } from '../auth/interfaces';
import { AdmiralLocale } from '../locale';
export type AdminProps = {
    menu: ComponentType;
    menuPopupExtraComponents?: ReactNode;
    logo?: LogoType;
    loginLogo?: LogoType;
    asideContent?: React.ReactNode;
    dataProvider: DataProvider;
    authProvider?: AuthProvider;
    themePresets?: {
        light: ThemePreset;
        dark: ThemePreset;
    };
    locale?: Partial<AdmiralLocale>;
    oauthProviders?: OAuthProvidersEnum[];
    baseAppUrl?: string;
};
export declare function Admin({ logo, loginLogo, asideContent, menu, menuPopupExtraComponents, dataProvider, authProvider, themePresets, locale, children, oauthProviders, baseAppUrl, }: AdminProps & {
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
