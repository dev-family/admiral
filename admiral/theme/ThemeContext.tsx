import React, { createContext, useState, useCallback, useContext, useMemo } from 'react'
import { Theme, ThemePreset, generateThemeClassNames } from '@consta/uikit/Theme'
import { ThemeName, ContextState, ProviderProps } from './interfaces'
import themeLight from './presets/themeLight'
import themeDark from './presets/themeDark'

function getPreset(themeName: ThemeName): ThemePreset {
    const obj = {
        light: themeLight,
        dark: themeDark,
    }
    return obj[themeName] || themeLight
}

const ThemeContext = createContext({} as ContextState)

export const ThemeProvider: React.FC<ProviderProps> = ({ children, presetName }) => {
    const [name, setName] = useState<ThemeName>(presetName)

    const toggleTheme = useCallback((name: ThemeName) => {
        setName(name)
    }, [])

    const preset = useMemo(() => getPreset(name), [name])

    return (
        <Theme preset={preset}>
            <ThemeContext.Provider
                value={{
                    theme: preset,
                    themeClassNames: generateThemeClassNames(preset),
                    themeName: name,
                    setTheme: toggleTheme,
                }}
            >
                {children}
            </ThemeContext.Provider>
        </Theme>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
