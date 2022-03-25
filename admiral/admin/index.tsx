import '../assets/global.css'
import React from 'react'
import { Layout } from '../ui'
import type { IMenuItem } from '../ui'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '../theme'
import { NavProvider } from '../navigation/NavContext'
import { HeaderLogoType } from '../ui/Layout/LayoutHeader'
import { DataProviderContextProvider, DataProvider } from '../dataProvider'

export type AdminProps = {
    menu: IMenuItem[]
    logo?: HeaderLogoType
    dataProvider: DataProvider
}

export const Admin: React.FC<AdminProps> = ({ logo, menu, dataProvider, children }) => {
    return (
        <DataProviderContextProvider value={dataProvider}>
            <Router>
                <ThemeProvider>
                    <NavProvider items={menu}>
                        <Layout logo={logo}>{children}</Layout>
                    </NavProvider>
                </ThemeProvider>
            </Router>
        </DataProviderContextProvider>
    )
}
