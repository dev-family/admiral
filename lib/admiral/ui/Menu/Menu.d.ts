import React from 'react';
import { MenuItemLinkProps, SubMenuProps } from './interfaces';
export declare const Menu: React.FC;
export declare const SubMenu: ({ icon, name, to, badge, children }: SubMenuProps) => JSX.Element;
export declare const MenuItemLink: ({ icon, name, to, exact, badge }: MenuItemLinkProps) => JSX.Element;
