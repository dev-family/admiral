import '@/assets/fonts.css'
import '@/assets/global.css'
import React from 'react'
import { Layout } from '@/admiral/ui'
import { IMenuItem } from '@/admiral/ui'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@/admiral/theme'
import { NavProvider } from '@/admiral/navigation/NavContext'
import { HeaderLogoType, HeaderLogoComponentType } from '@/admiral/ui/Layout/LayoutHeader'

type AdmiralProps = {
    menu: IMenuItem[]
    logo?: HeaderLogoType
}

export type { HeaderLogoComponentType, IMenuItem }

export const Admin: React.FC<AdmiralProps> = ({ logo, menu, children }) => {
    return (
        <Router>
            <ThemeProvider>
                <NavProvider items={menu}>
                    <Layout logo={logo}>{children}</Layout>
                </NavProvider>
            </ThemeProvider>
        </Router>
    )
}
