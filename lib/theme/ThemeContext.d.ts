import React from 'react';
import { ContextState, ProviderProps } from './interfaces';
export declare const themeStorageKey = "df_admin_theme";
export declare function ThemeProvider({ children, presetName, presets, }: ProviderProps & {
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useTheme(): ContextState;
