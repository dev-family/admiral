import React from 'react'
import { Menu, MenuItem, Layout, ThemeSwitch } from '../admiral/ui'
import { createRoutesFrom } from '../admiral/router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '../admiral/theme'

const Routes = createRoutesFrom(import.meta.globEager('../pages/**/*'))

function App() {
    return (
        <Router>
            <ThemeProvider presetName="light">
                <Layout>
                    <Menu>
                        <MenuItem icon="FiHome" name="Home" to="/" exact />
                        <MenuItem icon="FiUsers" name="Users" to="/users" />
                        <MenuItem icon="FiUsers" name="CRUD Users" to="/crud-users" />
                        <MenuItem icon="FiUsers" name="Custom page" to="/custom-page" />

                        <ThemeSwitch />
                    </Menu>
                    <Routes />
                </Layout>
            </ThemeProvider>
        </Router>
    )
}

export default App
