import React from 'react'
import { Admin, Button, createRoutesFrom, OAuthProvidersEnum, Switch } from '../admiral'
import Menu from './config/menu'
import dataProvider from './dataProvider'
import authProvider from './authProvider'
import AskSupport from './components/AskSupport'
import themeLight from './theme/themeLight'
import themeDark from './theme/themeDark'
import { admiralLocales } from '../admiral/locale'

const apiUrl = '/api'
const Routes = createRoutesFrom(import.meta.globEager('../pages/**/*'))

function App() {
    return (
        <Admin
            dataProvider={dataProvider(apiUrl)}
            authProvider={authProvider(apiUrl)}
            menu={Menu}
            locale={admiralLocales.ruRU}
            menuPopupExtraComponents={<AskSupport />}
            oauthProviders={[
                OAuthProvidersEnum.Google,
                OAuthProvidersEnum.Github,
                OAuthProvidersEnum.Jira,
            ]}
            themePresets={{ light: themeLight, dark: themeDark }}
        >
            <Routes />
        </Admin>
    )
}

export default App
