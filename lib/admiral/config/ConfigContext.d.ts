import { LogoType } from '../../admiral'
import React from 'react'
declare type ConfigContextValue = {
    logo?: LogoType
    loginLogo?: LogoType
    asideContent?: React.ReactNode
}
export declare const ConfigContext: React.Context<ConfigContextValue>
export declare const ConfigContextProvider: React.FC<{
    value: ConfigContextValue
}>
export declare function useConfig(): ConfigContextValue
export {}
