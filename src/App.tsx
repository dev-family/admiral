import '@/assets/fonts.css'
import '@/assets/global.css'
import React from 'react'
import { Menu, MenuItem, Layout } from '@/admiral/ui'
import { createRoutesFrom } from '@/admiral/router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@/admiral/theme'
import { NavProvider } from '@/src/context/NavContext'

const Routes = createRoutesFrom(import.meta.globEager('../pages/**/*'))

function App() {
    return (
        <Router>
            <ThemeProvider presetName="light">
                <NavProvider>
                    <Layout
                        asideContent={
                            <Menu>
                                <MenuItem icon="FiHome" name="Home" to="/" exact />
                                <MenuItem icon="FiUsers" name="Users" to="/users">
                                    <MenuItem name="Create User" to="/users/create" />
                                </MenuItem>
                                <MenuItem name="CRUD Users" to="/crud-users">
                                    <MenuItem name="Create User" to="/crud-users/create" />
                                </MenuItem>
                                <MenuItem icon="FiUsers" name="Custom page" to="/custom-page" />
                            </Menu>
                        }
                    >
                        <Routes />
                    </Layout>
                </NavProvider>
            </ThemeProvider>
        </Router>
    )
}

export default App
