import { ThemePreset } from '@consta/uikit/Theme'

export interface ContextState {
    theme: ThemePreset
    themeClassNames: ThemePreset
    themeName: ThemeName
    setTheme: (name: ThemeName) => void
}
export interface ProviderProps {
    presetName?: ThemeName
}

export type ThemeName = 'light' | 'dark'
