import React, { createContext, useCallback, useContext, useMemo } from 'react'
import { Theme, ThemePreset, generateThemeClassNames } from '@consta/uikit/Theme'
import { ThemeName, ContextState, ProviderProps } from './interfaces'
import { useMedia } from '../utils/hooks'
import { useLocalStorageState } from 'ahooks'
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
export const themeStorageKey = 'df_admin_theme'

export const ThemeProvider: React.FC<ProviderProps> = ({ children, presetName }) => {
    const prefersMode = useMedia(['(prefers-color-scheme: dark)'], ['dark'], 'light') as ThemeName
    const [name, setName] = useLocalStorageState(themeStorageKey, {
        defaultValue: presetName || prefersMode || 'light',
    })

    const toggleTheme = useCallback((name: ThemeName) => {
        if (name) setName(name)
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
