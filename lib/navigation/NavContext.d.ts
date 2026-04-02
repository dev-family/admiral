import React, { ComponentType } from 'react';
export interface ContextState {
    visible: boolean;
    toggle: () => void;
    open: () => void;
    close: () => void;
    collapsed: boolean;
    toggleCollapsed: () => void;
    menu: ComponentType;
}
type NavProviderProps = {
    menu: ComponentType;
    children: React.ReactNode;
};
export declare const menuCollapsedStorageKey = "df_admin_menu_collapsed";
export declare function NavProvider({ menu, children }: NavProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useNav(): ContextState;
export {};
