import '@/assets/fonts.css'
import '@/assets/global.css'
import React from 'react'
import { createRoutesFrom } from '@/admiral/router'
import menu from './config/menu'
import { Admin } from '@/admiral'
const Routes = createRoutesFrom(import.meta.globEager('../pages/**/*'))

function App() {
    return (
        <Admin menu={menu}>
            <Routes />
        </Admin>
    )
}

export default App
