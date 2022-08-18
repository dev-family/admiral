import * as Icons from 'react-icons/fi'

export interface SubMenuProps {
    icon?: keyof typeof Icons
    to?: string
    name: string
    children: SubMenuChild | SubMenuChild[]
}

export type SubMenuChild = React.ReactElement<
    MenuItemLinkProps,
    (props: MenuItemLinkProps) => JSX.Element
>

export interface MenuItemLinkProps {
    icon?: keyof typeof Icons
    name: string
    to: string
    exact?: boolean
}

export interface MenuItemContentProps extends Pick<MenuItemLinkProps, 'icon' | 'name'> {
    arrow?: boolean
}
