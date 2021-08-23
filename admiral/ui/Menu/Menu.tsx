import React from 'react'
import { useNav } from '@/src/context/NavContext'
import * as Icons from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { useTheme } from '@/admiral/theme'
import styles from './Menu.module.scss'
import cn from 'classnames'

export const Menu: React.FC = ({ children }) => {
    const { themeName } = useTheme()

    return (
        <ul className={cn(styles.menu, { [styles.menu__Dark]: themeName === 'dark' })}>
            {children}
        </ul>
    )
}

type MenuItemProps = {
    icon?: keyof typeof Icons
    name: string
    to: string
    exact?: boolean
}

export const MenuItem: React.FC<MenuItemProps> = ({
    icon = 'FiFileText',
    name,
    to,
    exact = false,
    children,
}) => {
    const { close } = useNav()

    const Icon = Icons[icon]

    return (
        <li className={styles.item}>
            <NavLink
                to={to}
                activeClassName={styles.link__Active}
                className={styles.link}
                exact={exact}
                onClick={close}
            >
                <Icon name={icon} className={styles.link_Icon} />
                <span className={styles.link_Title}>{name}</span>
            </NavLink>

            {children && <Menu>{children}</Menu>}
        </li>
    )
}
