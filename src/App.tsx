import React from 'react'
import { Admin, createRoutesFrom } from '../admiral'
import menu from './config/menu'
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
