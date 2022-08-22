/// <reference types="react" />
import * as Icons from 'react-icons/fi';
import { BadgeProps } from '../Badge/interfaces';
export interface SubMenuProps {
    icon?: keyof typeof Icons;
    to?: string;
    name: string;
    badge?: MenuItemLinkBadgeProps;
    children: SubMenuChild | SubMenuChild[];
}
export declare type SubMenuChild = React.ReactElement<MenuItemLinkProps, (props: MenuItemLinkProps) => JSX.Element>;
export interface MenuItemLinkProps {
    icon?: keyof typeof Icons;
    name: string;
    to: string;
    exact?: boolean;
    badge?: MenuItemLinkBadgeProps;
}
interface MenuItemLinkBadgeProps extends Omit<BadgeProps, 'children' | 'size' | 'className'> {
}
export interface MenuItemContentProps extends Pick<MenuItemLinkProps, 'icon' | 'name' | 'badge'> {
    arrow?: boolean;
    collapsed: boolean;
}
export {};
