import React from 'react';
import * as Icons from 'react-icons/fi';
export declare const Menu: React.FC<{
    items: IMenuItem[];
    type?: 'tooltip' | 'modal';
    collapsible?: boolean;
}>;
export interface IMenuItem {
    icon?: keyof typeof Icons;
    name: string;
    to?: string;
    exact?: boolean;
    children?: IMenuItem[];
}
interface IMenuItemProps extends IMenuItem {
    tooltip?: boolean;
    collapsible?: boolean;
}
export declare const MenuItem: ({ icon, name, to, exact, children, tooltip, collapsible, }: IMenuItemProps) => JSX.Element;
export {};
