import '@/assets/fonts.css'
import '@/assets/global.css'
import React from 'react'
import { Layout } from '@/admiral/ui'
import { createRoutesFrom } from '@/admiral/router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@/admiral/theme'
import { NavProvider } from '@/src/context/NavContext'

const Routes = createRoutesFrom(import.meta.globEager('../pages/**/*'))

function App() {
    return (
        <Router>
            <ThemeProvider>
                <NavProvider>
                    <Layout>
                        <Routes />
                    </Layout>
                </NavProvider>
            </ThemeProvider>
        </Router>
    )
}

export default App
