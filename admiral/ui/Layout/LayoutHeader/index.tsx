import React from 'react'
import styles from '../Layout.module.scss'
import { useNav } from '@/src/context/NavContext'
import { useTheme } from '@/admiral/theme'
import { FiArrowLeft, FiArrowRight, FiX, FiMenu } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import Icon from '@/assets/icons'
import cn from 'classnames'

const LayoutHeader: React.FC = () => {
    const { themeName } = useTheme()
    const { close: closeNav, collapsed, toggleCollapsed, toggle: toggleNav, visible } = useNav()

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
                <Icon
                    name={themeName === 'light' ? 'dev-family-logo' : 'dev-family-logo-inversion'}
                    width={84}
                />
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
