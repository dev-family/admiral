import { ThemePreset as ThemePresetType } from '@consta/uikit/Theme'

export interface ContextState {
    theme: ThemePresetType
    themeClassNames: ThemePresetType
    themeName: ThemeName
    setTheme: (name: ThemeName) => void
}
export interface ProviderProps {
    presetName?: ThemeName
    presets?: { light: ThemePreset; dark: ThemePreset }
}

export type ThemeName = 'light' | 'dark'

export type ThemePreset = ThemePresetType
