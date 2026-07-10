import { LogoType } from '../ui/Layout/LayoutHeader'
import { OAuthProvidersEnum } from '../auth/interfaces'
import React, { ReactNode, createContext, useContext } from 'react'

type ConfigContextValue = {
    logo?: LogoType
    loginLogo?: LogoType
    asideContent?: React.ReactNode
    oauthProviders?: OAuthProvidersEnum[]
    menuPopupExtraComponents?: ReactNode
}

export const ConfigContext = createContext<ConfigContextValue>({})
ConfigContext.displayName = 'ConfigContext'

export function ConfigContextProvider({
    value,
    children,
}: {
    value: ConfigContextValue
    children?: React.ReactNode
}) {
    return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
}

export function useConfig() {
    return useContext(ConfigContext)
}
