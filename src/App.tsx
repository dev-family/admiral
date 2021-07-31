import { Menu, MenuItem, Layout } from '../admiral/ui'
import { createRoutesFrom } from '../admiral/router'
import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'

const Routes = createRoutesFrom(import.meta.globEager('../pages/**/*'))

function App() {
    return (
        <Router>
            <Layout>
                <Menu>
                    <MenuItem icon="FiHome" name="Home" to="/" exact />
                    <MenuItem icon="FiUsers" name="Users" to="/users" />
                    <MenuItem icon="FiUsers" name="CRUD Users" to="/crud-users" />
                    <MenuItem icon="FiUsers" name="Custom page" to="/custom-page" />
                </Menu>
                <Routes />
            </Layout>
        </Router>
    )
}

export default App
