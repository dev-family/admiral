import React from 'react'
import { Admin, Button, createRoutesFrom, OAuthProvidersEnum, Switch } from '../admiral'
import Menu from './config/menu'
import dataProvider from './dataProvider'
import authProvider from './authProvider'
import AskSupport from './components/AskSupport'

const apiUrl = '/api'
const Routes = createRoutesFrom(import.meta.globEager('../pages/**/*'))

function App() {
    return (
        <Admin
            dataProvider={dataProvider(apiUrl)}
            authProvider={authProvider(apiUrl)}
            menu={Menu}
            menuPopupExtraComponents={<AskSupport />}
            oauthProviders={[
                OAuthProvidersEnum.Google,
                OAuthProvidersEnum.Github,
                OAuthProvidersEnum.Jira,
            ]}
        >
            <Routes />
        </Admin>
    )
}

export default App
