import '../assets/global.css';
import React from 'react';
import type { IMenuItem } from '../ui';
import { LogoType } from '../ui/Layout/LayoutHeader';
import { DataProvider } from '../dataProvider';
import type { AuthProvider } from '../auth/interfaces';
export declare type AdminProps = {
    menu: IMenuItem[];
    logo?: LogoType;
    loginLogo?: LogoType;
    asideContent?: React.ReactNode;
    dataProvider: DataProvider;
    authProvider?: AuthProvider;
};
export declare const Admin: React.FC<AdminProps>;
