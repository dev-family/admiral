import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import menuItems, { IMenuItem } from './menuItems'
import { useNav } from '@/src/context/NavContext'
import { useTheme } from '@/admiral/theme'
import * as Icons from 'react-icons/fi'
import styles from './Menu.module.scss'
import { Tooltip } from '@/admiral/ui'
import cn from 'classnames'

export const Menu: React.FC<{
    items?: IMenuItem[]
    type?: 'tooltip' | 'modal'
    collapsible?: boolean
}> = ({ items = menuItems, type, collapsible = true }) => {
    const { themeName } = useTheme()

    return (
        <ul
            className={cn(styles.menu, {
                [styles.menu__Dark]: themeName === 'dark',
                [styles.menu__Tooltip]: type === 'tooltip',
            })}
        >
            {items.map((item, key) => {
                return (
                    <MenuItem
                        key={key}
                        {...item}
                        tooltip={type !== 'tooltip' && type !== 'modal'}
                        collapsible={collapsible && type !== 'modal'}
                    />
                )
            })}
        </ul>
    )
}

interface IMenuItemProps extends IMenuItem {
    tooltip?: boolean
    collapsible?: boolean
}

export const MenuItem = ({
    icon,
    name,
    to,
    exact = true,
    children,
    tooltip = true,
    collapsible = true,
}: IMenuItemProps) => {
    const { close, collapsed } = useNav()
    const { pathname } = useLocation()
    const isActive = to === pathname
    const hasChildren = children && children.length > 0
    const hasActiveChild = children?.some((item) => item.to === pathname) ?? false
    const [collapseOpened, setCollapseOpened] = useState(false)

    useEffect(() => {
        if (hasChildren) {
            if (collapsed) {
                setCollapseOpened(false)
            } else {
                setCollapseOpened(isActive || hasActiveChild)
            }
        }
    }, [collapsed])

    return (
        <li className={cn(styles.item, { [styles.item__Open]: hasActiveChild })}>
            <Tooltip
                trigger="mouseenter"
                placement="right"
                content={
                    children ? (
                        <Menu items={children} type="tooltip" collapsible={false}>
                            {children}
                        </Menu>
                    ) : (
                        name
                    )
                }
                interactive={collapsed && !!children}
                disabled={!collapsed || !tooltip}
                {...(hasChildren && { mode: 'custom' })}
            >
                {hasChildren ? (
                    <div
                        className={cn(styles.link, styles.link__Toggle, {
                            [styles.link__Collapsible]: collapsible,
                            [styles.link__Collapsed]: collapsed,
                            [styles.link__ToggleOpen]: collapseOpened,
                        })}
                        onClick={() => {
                            setCollapseOpened((prev) => !prev)
                        }}
                    >
                        <MenuItemContent icon={icon} name={name} arrow />
                    </div>
                ) : (
                    <NavLink
                        to={to as string}
                        activeClassName={styles.link__Active}
                        className={cn(styles.link, {
                            [styles.link__Collapsible]: collapsible,
                            [styles.link__Collapsed]: collapsed,
                        })}
                        exact={exact}
                        onClick={() => {
                            close()
                        }}
                    >
                        <MenuItemContent icon={icon} name={name} />
                    </NavLink>
                )}
            </Tooltip>

            {children && ((collapsible && !collapsed) || !collapsible) && collapseOpened && (
                <Menu items={children} collapsible={false}>
                    {children}
                </Menu>
            )}
        </li>
    )
}

interface IMenuItemContentProps extends Pick<IMenuItem, 'icon' | 'name'> {
    arrow?: boolean
}

const MenuItemContent = ({ icon = 'FiFileText', name, arrow = false }: IMenuItemContentProps) => {
    const Icon = Icons[icon]
    const Arrow = Icons['FiChevronDown']

    return (
        <>
            <Icon name={icon} className={styles.link_Icon} />
            <span className={styles.link_Title}>{name}</span>
            {arrow && (
                <div className={styles.link_Arrow}>
                    <Arrow />
                </div>
            )}
        </>
    )
}
