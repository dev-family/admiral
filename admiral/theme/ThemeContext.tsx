import React, { createContext, useCallback, useContext, useMemo } from 'react'
import { Theme, ThemePreset, generateThemeClassNames } from '@consta/uikit/Theme'
import { ThemeName, ContextState, ProviderProps } from './interfaces'
import { useMedia, useLocalStorage } from '@/src/hooks'
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
    const prefersMode = useMedia(['(prefers-color-scheme: dark)'], ['dark'], 'light') as ThemeName
    const [name, setName] = useLocalStorage('admiral-dark-mode-enabled', presetName || prefersMode)

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
