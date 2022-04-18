import React from 'react';
import { IMenuItem } from '../ui';
export interface ContextState {
    visible: boolean;
    toggle: () => void;
    open: () => void;
    close: () => void;
    collapsed: boolean;
    toggleCollapsed: () => void;
    items: IMenuItem[];
}
declare type NavProviderProps = {
    items: IMenuItem[];
    children: React.ReactNode;
};
export declare const menuCollapsedStorageKey = "df_admin_menu_collapsed";
export declare function NavProvider({ items, children }: NavProviderProps): JSX.Element;
export declare function useNav(): ContextState;
export {};
