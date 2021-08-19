import React from 'react'
import * as Icons from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../../theme'
import cn from 'classnames'

export const Menu: React.FC = ({ children }) => {
    const { themeName } = useTheme()

    return (
        <aside
            className={cn('navbar', 'navbar-vertical', 'navbar-expand-lg', {
                'navbar-light': themeName === 'light',
                'navbar-dark': themeName === 'dark',
            })}
        >
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbar-menu">
                    <ul className="navbar-nav pt-lg-3">{children}</ul>
                </div>
            </div>
        </aside>
    )
}

type MenuItemProps = {
    icon: keyof typeof Icons
    name: string
    to: string
    exact?: boolean
}

export const MenuItem: React.FC<MenuItemProps> = ({ icon, name, to, exact = false }) => {
    const Icon = Icons[icon]

    return (
        <li className="nav-item">
            <NavLink to={to} activeClassName="active" className="nav-link" exact={exact}>
                <Icon className="nav-link-icon d-md-none d-lg-inline-block" />
                <span className="nav-link-title">{name}</span>
            </NavLink>
        </li>
    )
}
