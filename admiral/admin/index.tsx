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

export type AdminProps = {
    menu: ComponentType
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
                    <UserContextProvider>
                        <Router>
                            <ThemeProvider>
                                <NavProvider menu={menu}>{children}</NavProvider>
                            </ThemeProvider>
                        </Router>
                    </UserContextProvider>
                </ConfigContextProvider>
            </DataProviderContextProvider>
        </AuthContextProvider>
    )
}
