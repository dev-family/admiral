import { LogoType } from '../../admiral'
import React, { createContext, useContext } from 'react'

type ConfigContextValue = {
    logo?: LogoType
    loginLogo?: LogoType
    asideContent?: React.ReactNode
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
