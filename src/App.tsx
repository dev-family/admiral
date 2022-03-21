import React from 'react'
import { createRoutesFrom } from '@/admiral/router'
import menu from './config/menu'
import { Admin } from '@/admiral'
import dataProvider from './dataProvider'

const apiUrl = '/api'
const Routes = createRoutesFrom(import.meta.globEager('../pages/**/*'))

function App() {
    return (
        <Admin dataProvider={dataProvider(apiUrl)} menu={menu}>
            <Routes />
        </Admin>
    )
}

export default App
