import React from 'react'
import styles from '../Layout.module.scss'
import { useNav } from '@/admiral/navigation/NavContext'
import { useTheme } from '@/admiral/theme'
import { ThemeName } from '@/admiral/theme/interfaces'
import { FiArrowLeft, FiX, FiMenu } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import Icon from '@/assets/icons'
import cn from 'classnames'

export type HeaderLogoType = string | HeaderLogoComponentType
export type HeaderLogoComponentType = ({ themeName }: { themeName: ThemeName }) => JSX.Element

const LayoutHeader: React.FC<{ logo?: HeaderLogoType }> = ({ logo = LogoDefault }) => {
    const { themeName } = useTheme()
    const { close: closeNav, collapsed, toggleCollapsed, toggle: toggleNav, visible } = useNav()

    const LogoComponent = typeof logo === 'function' ? logo : null

    return (
        <header
            className={cn(styles.panel_Header, { [styles.panel_Header__Collapsed]: collapsed })}
        >
            <NavLink
                to="/"
                activeClassName={styles.logo__Active}
                className={styles.logo}
                exact
                onClick={closeNav}
            >
                {LogoComponent ? (
                    <LogoComponent themeName={themeName} />
                ) : (
                    <img src={logo as string} alt="logo" />
                )}
            </NavLink>

            <button
                className={cn(styles.collapseToggle, styles.collapseToggle__Desktop, {
                    [styles.collapseToggle__Collapsed]: collapsed,
                })}
                onClick={toggleCollapsed}
            >
                <FiArrowLeft />
            </button>

            <button
                className={cn(styles.collapseToggle, styles.collapseToggle__Mobile)}
                onClick={toggleNav}
            >
                {visible ? <FiX /> : <FiMenu />}
            </button>
        </header>
    )
}

export default LayoutHeader

const LogoDefault = ({ themeName }: { themeName: ThemeName }) => {
    return (
        <Icon
            name={themeName === 'light' ? 'dev-family-logo' : 'dev-family-logo-inversion'}
            width={84}
        />
    )
}
