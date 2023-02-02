import React from 'react'
import { Admin, createRoutesFrom } from 'admiral'
import menu from './config/menu'
import dataProvider from './config/dataProvider'
import authProvider from './config/authProvider'
import 'admiral/style.css'
import themeLight from './config/theme/presets/themeLight'
import themeDark from "./config/theme/presets/themeDark";
import themeMaterialLight from "./config/theme/material/themeMaterialLight";
import themeMaterialDark from "./config/theme/material/themeMaterialDark";

const apiUrl = import.meta.env.VITE_API_URL || '/api'
const Routes = createRoutesFrom(import.meta.globEager('../pages/**/*'))

function App() {
    return (
        <Admin
            dataProvider={dataProvider(apiUrl)}
            authProvider={authProvider(apiUrl)}
            menu={menu}
            //themePresets={{light: themeMaterialLight, dark: themeMaterialDark}}
        >
            <Routes />
        </Admin>
    )
}

export default App
