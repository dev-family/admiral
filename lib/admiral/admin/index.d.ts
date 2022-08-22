import '../assets/global.css';
import React, { ComponentType } from 'react';
import { LogoType } from '../ui/Layout/LayoutHeader';
import { DataProvider } from '../dataProvider';
import type { AuthProvider } from '../auth/interfaces';
import { ThemePreset } from '../theme/interfaces';
export declare type AdminProps = {
    menu: ComponentType;
    logo?: LogoType;
    loginLogo?: LogoType;
    asideContent?: React.ReactNode;
    dataProvider: DataProvider;
    authProvider?: AuthProvider;
    themePresets?: {
        light: ThemePreset;
        dark: ThemePreset;
    };
};
export declare const Admin: React.FC<AdminProps>;
