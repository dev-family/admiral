import React from 'react'
import { Layout } from '@/admiral/ui'
import { IMenuItem } from '@/admiral/ui'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@/admiral/theme'
import { NavProvider } from '@/admiral/navigation/NavContext'
import { HeaderLogoType } from '@/admiral/ui/Layout/LayoutHeader'
import { DataProviderContextProvider, DataProvider } from '@/admiral/dataProvider'

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
