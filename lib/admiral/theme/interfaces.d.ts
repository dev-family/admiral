import { ThemePreset as ThemePresetType } from '@consta/uikit/Theme'
export interface ContextState {
    theme: ThemePresetType
    themeClassNames: ThemePresetType
    themeName: ThemeName
    setTheme: (name: ThemeName) => void
}
export interface ProviderProps {
    presetName?: ThemeName
}
export declare type ThemeName = 'light' | 'dark'
export declare type ThemePreset = ThemePresetType
