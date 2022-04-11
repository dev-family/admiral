import React from 'react'
import { ContextState, ProviderProps } from './interfaces'
export declare const themeStorageKey = 'df_admin_theme'
export declare const ThemeProvider: React.FC<ProviderProps>
export declare function useTheme(): ContextState
