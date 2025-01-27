import React, { createContext, useContext, useMemo } from 'react'
import { enUS } from './locales'
import { AdmiralLocale } from './interfaces'

export const defaultLocale: AdmiralLocale = enUS

export const LocaleContext = createContext<AdmiralLocale>({ ...defaultLocale })

export const LocaleContextProvider: React.FC<{ value?: Partial<AdmiralLocale> }> = ({
    value,
    children,
}) => {
    const contextValue = useMemo(
        () => (value ? { ...defaultLocale, ...value } : { ...defaultLocale }),
        [value],
    )

    return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>
}

export function useLocaleProvider() {
    return useContext(LocaleContext)
}
