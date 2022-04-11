import '../assets/global.css'
import React from 'react'
import type { IMenuItem } from '../ui'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '../theme'
import { NavProvider } from '../navigation/NavContext'
import { LogoType } from '../ui/Layout/LayoutHeader'
import { DataProviderContextProvider, DataProvider } from '../dataProvider'
import { AuthContextProvider } from '../auth/AuthContext'
import type { AuthProvider } from '../auth/interfaces'
import { ConfigContextProvider } from '../config/ConfigContext'

export type AdminProps = {
    menu: IMenuItem[]
    logo?: LogoType
    loginLogo?: LogoType
    asideContent?: React.ReactNode
    dataProvider: DataProvider
    authProvider?: AuthProvider
}

export const Admin: React.FC<AdminProps> = ({
    logo,
    loginLogo,
    asideContent,
    menu,
    dataProvider,
    authProvider,
    children,
}) => {
    return (
        <AuthContextProvider value={authProvider}>
            <DataProviderContextProvider value={dataProvider}>
                <ConfigContextProvider value={{ logo, loginLogo, asideContent }}>
                    <Router>
                        <ThemeProvider>
                            <NavProvider items={menu}>{children}</NavProvider>
                        </ThemeProvider>
                    </Router>
                </ConfigContextProvider>
            </DataProviderContextProvider>
        </AuthContextProvider>
    )
}
