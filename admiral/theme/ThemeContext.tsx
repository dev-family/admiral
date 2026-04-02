import React, { createContext, useCallback, useContext, useMemo } from 'react'
import { Theme, ThemePreset, generateThemeClassNames } from '@consta/uikit/Theme'
import { ThemeName, ContextState, ProviderProps } from './interfaces'
import { useMedia, useLocalStorageState } from '../utils/hooks'
import themeLight from './presets/themeLight'
import themeDark from './presets/themeDark'

function getPreset(
    themeName: ThemeName,
    presets?: { light: ThemePreset; dark: ThemePreset },
): ThemePreset {
    const _presets = presets || {
        light: themeLight,
        dark: themeDark,
    }

    return _presets[themeName] || _presets.light
}

const ThemeContext = createContext({} as ContextState)
export const themeStorageKey = 'df_admin_theme'

export function ThemeProvider({
    children,
    presetName,
    presets,
}: ProviderProps & { children?: React.ReactNode }) {
    const prefersMode = useMedia(['(prefers-color-scheme: dark)'], ['dark'], 'light') as ThemeName
    const [name, setName] = useLocalStorageState(themeStorageKey, {
        defaultValue: presetName || prefersMode || 'light',
    })

    const toggleTheme = useCallback((name: ThemeName) => {
        if (name) setName(name)
    }, [])

    const preset = useMemo(() => getPreset(name, presets), [name, presets])

    const value = useMemo(
        () => ({
            theme: preset,
            themeClassNames: generateThemeClassNames(preset),
            themeName: name,
            setTheme: toggleTheme,
        }),
        [preset, name],
    )

    return (
        <Theme preset={preset}>
            <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
        </Theme>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
