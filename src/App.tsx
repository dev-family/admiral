import { Admin, createRoutesFrom, OAuthProvidersEnum } from '../admiral'
import Menu from './config/menu'
import dataProvider from './dataProvider'
import authProvider from './authProvider'
import AskSupport from './components/AskSupport'
import themeLight from './theme/themeLight'
import themeDark from './theme/themeDark'

const apiUrl = '/api'
const Routes = createRoutesFrom(import.meta.glob('../pages/**/*', { eager: true }))

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
            themePresets={{ light: themeLight, dark: themeDark }}
        >
            <Routes />
        </Admin>
    )
}

export default App
