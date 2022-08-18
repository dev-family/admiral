import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useNav } from '../../navigation/NavContext'
import { useTheme } from '../../theme'
import * as Icons from 'react-icons/fi'
import styles from './Menu.module.scss'
import { Tooltip } from '../../ui'
import cn from 'classnames'
import { RouterLocationState } from '../../router/interfaces'
import { MenuItemLinkProps, MenuItemContentProps, SubMenuProps } from './interfaces'

export const Menu: React.FC = ({ children }) => {
    const { themeName } = useTheme()

    return (
        <ul
            className={cn(styles.menu, {
                [styles.menu__Dark]: themeName === 'dark',
            })}
        >
            {children}
        </ul>
    )
}

const TooltipMenu: React.FC = ({ children }) => {
    const { themeName } = useTheme()

    return (
        <ul
            className={cn(styles.menu, styles.menu__Tooltip, {
                [styles.menu__Dark]: themeName === 'dark',
            })}
        >
            {children}
        </ul>
    )
}

export const SubMenu = ({ icon, name, to, children }: SubMenuProps) => {
    const { pathname } = useLocation<RouterLocationState>()

    const { collapsed, visible } = useNav()
    const [accordionOpened, setAccordionOpened] = useState(false)
    const childs = React.Children.map(children, (child) => child.props)
    const hasActiveChild = childs.some(({ to }) => to === pathname)
    const isActive = to === pathname

    useEffect(() => {
        if (collapsed) {
            setAccordionOpened(false)
        } else {
            setAccordionOpened(hasActiveChild || isActive)
        }
    }, [collapsed])

    return (
        <li className={cn(styles.item, { [styles.item__Active]: hasActiveChild || isActive })}>
            <Tooltip
                trigger="mouseenter"
                placement="right"
                content={
                    <TooltipMenu>
                        {childs.map((child) => (
                            <TooltipMenuItemLink key={child.name} {...child} />
                        ))}
                    </TooltipMenu>
                }
                interactive={collapsed}
                disabled={!collapsed || visible}
                mode="custom"
            >
                <div
                    className={cn(styles.link, styles.link__Toggle, {
                        [styles.link__Collapsible]: true,
                        [styles.link__Collapsed]: collapsed && !visible,
                        [styles.link__ToggleOpen]: accordionOpened,
                    })}
                    onClick={() => {
                        setAccordionOpened((prev) => !prev)
                    }}
                >
                    <MenuItemContent icon={icon} name={name} arrow />
                </div>
            </Tooltip>

            {(!collapsed || (collapsed && visible)) && accordionOpened && <Menu>{children}</Menu>}
        </li>
    )
}

export const MenuItemLink = ({ icon, name, to, exact = false }: MenuItemLinkProps) => {
    const { close, collapsed, visible } = useNav()

    return (
        <li className={cn(styles.item)}>
            <Tooltip
                trigger="mouseenter"
                placement="right"
                content={name}
                interactive={false}
                disabled={!collapsed}
            >
                <NavLink
                    to={to as string}
                    activeClassName={styles.link__Active}
                    className={cn(styles.link, {
                        [styles.link__Collapsible]: true,
                        [styles.link__Collapsed]: collapsed && !visible,
                    })}
                    exact={exact}
                    onClick={() => {
                        close()
                    }}
                >
                    <MenuItemContent icon={icon} name={name} />
                </NavLink>
            </Tooltip>
        </li>
    )
}

const TooltipMenuItemLink = ({ icon, name, to, exact = false }: MenuItemLinkProps) => {
    const { close } = useNav()

    return (
        <li className={cn(styles.item)}>
            <NavLink
                to={to as string}
                activeClassName={styles.link__Active}
                className={cn(styles.link)}
                exact={exact}
                onClick={() => {
                    close()
                }}
            >
                <MenuItemContent icon={icon} name={name} />
            </NavLink>
        </li>
    )
}

const MenuItemContent = ({ icon = 'FiFileText', name, arrow = false }: MenuItemContentProps) => {
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
