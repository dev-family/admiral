import { LogoType, OAuthProvidersEnum } from '../../admiral'
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

export const ConfigContextProvider: React.FC<{ value: ConfigContextValue }> = ({
    value,
    children,
}) => {
    return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
}

export function useConfig() {
    return useContext(ConfigContext)
}
