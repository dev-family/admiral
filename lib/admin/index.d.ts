import React, { ComponentType, ReactNode } from 'react';
import { LogoType } from '../ui/Layout/LayoutHeader/index.js';
import { DataProvider } from '../dataProvider/index.js';
import type { AuthProvider } from '../auth/interfaces.js';
import { ThemePreset } from '../theme/interfaces.js';
import { OAuthProvidersEnum } from '../auth/interfaces.js';
import { AdmiralLocale } from '../locale/index.js';
import { ErrorBoundaryProps } from '../ui/ErrorBoundary/ErrorBoundary.js';
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
    errorFallback?: ErrorBoundaryProps['fallback'];
};
export declare function Admin({ logo, loginLogo, asideContent, menu, menuPopupExtraComponents, dataProvider, authProvider, themePresets, locale, children, oauthProviders, baseAppUrl, errorFallback, }: AdminProps & {
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
