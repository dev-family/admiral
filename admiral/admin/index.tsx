import '../assets/global.css'
import React, { ComponentType } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '../theme'
import { NavProvider } from '../navigation/NavContext'
import { LogoType } from '../ui/Layout/LayoutHeader'
import { DataProviderContextProvider, DataProvider } from '../dataProvider'
import { AuthContextProvider } from '../auth/AuthContext'
import { UserContextProvider } from '../auth/UserContext'
import type { AuthProvider } from '../auth/interfaces'
import { ConfigContextProvider } from '../config/ConfigContext'
import { ThemePreset } from '../theme/interfaces'
import { LocaleContextProvider } from '../crud/locale/LocaleContext'
import { CRUDLocale } from '../crud/interfaces'

export type AdminProps = {
    menu: ComponentType
    logo?: LogoType
    loginLogo?: LogoType
    asideContent?: React.ReactNode
    dataProvider: DataProvider
    authProvider?: AuthProvider
    themePresets?: { light: ThemePreset; dark: ThemePreset }
    locale?: Partial<CRUDLocale>
}

export const Admin: React.FC<AdminProps> = ({
    logo,
    loginLogo,
    asideContent,
    menu,
    dataProvider,
    authProvider,
    themePresets,
    locale,
    children,
}) => {
    return (
        <AuthContextProvider value={authProvider}>
            <DataProviderContextProvider value={dataProvider}>
                <ConfigContextProvider value={{ logo, loginLogo, asideContent }}>
                    <LocaleContextProvider value={locale}>
                        <UserContextProvider>
                            <Router>
                                <ThemeProvider presets={themePresets}>
                                    <NavProvider menu={menu}>{children}</NavProvider>
                                </ThemeProvider>
                            </Router>
                        </UserContextProvider>
                    </LocaleContextProvider>
                </ConfigContextProvider>
            </DataProviderContextProvider>
        </AuthContextProvider>
    )
}
