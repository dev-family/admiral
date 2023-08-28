import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { useNav } from '../../navigation/NavContext'
import { useTheme } from '../../theme'
import * as Icons from 'react-icons/fi'
import styles from './Menu.module.scss'
import { Badge, Tooltip } from '../../ui'
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

export const SubMenu = ({ icon, name, to, badge, children }: SubMenuProps) => {
    const { pathname } = useLocation<RouterLocationState>()
    const params = useParams()
    const paramValues = Object.values(params)

    const childs = React.Children.map(children, (child) => child.props)
    const hasActiveChild = childs.some(
        ({ to }) => (paramValues.length ? `${to}/${paramValues.join('/')}` : to) === pathname,
    )
    const isActive = (paramValues.length ? `${to}/${paramValues.join('/')}` : to) === pathname

    const { collapsed, visible } = useNav()
    const [accordionOpened, setAccordionOpened] = useState(hasActiveChild || isActive)

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
                    <MenuItemContent
                        collapsed={collapsed && !visible}
                        icon={icon}
                        name={name}
                        badge={badge}
                        arrow
                    />
                </div>
            </Tooltip>

            {(!collapsed || (collapsed && visible)) && accordionOpened && <Menu>{children}</Menu>}
        </li>
    )
}

export const MenuItemLink = ({ icon, name, to, exact = false, badge }: MenuItemLinkProps) => {
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
                    <MenuItemContent
                        icon={icon}
                        name={name}
                        badge={badge}
                        collapsed={collapsed && !visible}
                    />
                </NavLink>
            </Tooltip>
        </li>
    )
}

const TooltipMenuItemLink = ({ icon, name, to, exact = false, badge }: MenuItemLinkProps) => {
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
                <MenuItemContent collapsed={false} icon={icon} name={name} badge={badge} />
            </NavLink>
        </li>
    )
}

const MenuItemContent = ({
    icon = 'FiFileText',
    name,
    arrow = false,
    badge,
    collapsed,
}: MenuItemContentProps) => {
    const withBadge = !!badge
    const Icon = Icons[icon]
    const Arrow = Icons['FiChevronDown']

    const title = <span className={styles.link_Title}>{name}</span>
    const iconNode = <Icon name={icon} className={styles.link_Icon} />

    return (
        <>
            {withBadge && collapsed ? (
                <Badge {...badge} size="XS" className={cn(styles.link_BadgeIconWrapper)}>
                    {iconNode}
                </Badge>
            ) : (
                iconNode
            )}

            <div className={styles.link_TitleWrapper}>
                {withBadge && badge.dot ? (
                    <Badge {...badge} size="XS" className={styles.link_DotBadge}>
                        {title}
                    </Badge>
                ) : (
                    <>
                        {title}
                        {withBadge && <Badge size="S" {...badge} />}
                    </>
                )}
            </div>

            {arrow && (
                <div className={styles.link_Arrow}>
                    <Arrow />
                </div>
            )}
        </>
    )
}
