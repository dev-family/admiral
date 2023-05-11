import React from 'react'
import { Admin, createRoutesFrom, OAuthProvidersEnum, Switch } from '../admiral'
import Menu from './config/menu'
import dataProvider from './dataProvider'
import authProvider from './authProvider'

const apiUrl = '/api'
const Routes = createRoutesFrom(import.meta.globEager('../pages/**/*'))

function App() {
    return (
        <Admin
            dataProvider={dataProvider(apiUrl)}
            authProvider={authProvider(apiUrl)}
            menu={Menu}
            menuPopupExtraComponents={
                <div style={{ display: 'flex', gap: '16px' }}>
                    Toggle something here...
                    <Switch defaultChecked size="L" />
                </div>
            }
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
