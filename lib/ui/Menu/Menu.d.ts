import React from 'react';
import { MenuItemLinkProps, SubMenuProps } from './interfaces.js';
export declare function Menu({ children }: {
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare const SubMenu: ({ icon, name, to, badge, children }: SubMenuProps) => import("react/jsx-runtime").JSX.Element;
export declare const MenuItemLink: ({ icon, name, to, exact, badge }: MenuItemLinkProps) => import("react/jsx-runtime").JSX.Element;
