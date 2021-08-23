import React from 'react'
import styles from '../Layout.module.scss'
import { useNav } from '@/src/context/NavContext'
import { Header, HeaderModule } from '@consta/uikit/Header'
import { useTheme } from '@/admiral/theme'
import { ThemeSwitch } from '@/admiral/ui'
import { NavLink } from 'react-router-dom'
import Icon from '@/assets/icons'
import cn from 'classnames'

const LayoutHeader: React.FC = () => {
    const { themeName } = useTheme()
    const { close: closeNav } = useNav()

    return (
        <Header
            className={cn(styles.header)}
            leftSide={
                <HeaderModule>
                    <NavLink
                        to="/"
                        activeClassName={styles.logo__Active}
                        className={styles.logo}
                        exact
                        onClick={closeNav}
                    >
                        <Icon
                            name={
                                themeName === 'light'
                                    ? 'dev-family-logo'
                                    : 'dev-family-logo-inversion'
                            }
                            width={84}
                        />
                    </NavLink>
                </HeaderModule>
            }
            rightSide={<ThemeSwitch />}
        />
    )
}

export default LayoutHeader
