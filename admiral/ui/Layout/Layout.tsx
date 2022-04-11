import React from 'react'
import styles from './Layout.module.scss'
import LayoutHeader from './LayoutHeader'
import LayoutAside from './LayoutAside'
import LayoutFooter from './LayoutFooter'
import { useNav } from '../../navigation/NavContext'
import { useConfig } from '../../config/ConfigContext'
import cn from 'classnames'

export const Layout: React.FC = ({ children }) => {
    const { collapsed } = useNav()
    const { logo, asideContent } = useConfig()

    return (
        <div
            className={cn(styles.wrap, {
                [styles.wrap__Collapsed]: collapsed,
            })}
        >
            <div className={styles.panel}>
                <LayoutHeader logo={logo} />
                <LayoutAside>{asideContent}</LayoutAside>
                <LayoutFooter />
            </div>

            <main className={styles.content}>{children}</main>
        </div>
    )
}
