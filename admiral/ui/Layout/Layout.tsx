import React from 'react'
import styles from './Layout.module.scss'
import LayoutHeader from './LayoutHeader'
import LayoutAside from './LayoutAside'
import LayoutFooter from './LayoutFooter'
import { useNav } from '../../navigation/NavContext'
import { HeaderLogoType } from './LayoutHeader'
import cn from 'classnames'

export const Layout: React.FC<{ logo?: HeaderLogoType; asideContent?: React.ReactNode }> = ({
    logo,
    asideContent,
    children,
}) => {
    const { collapsed } = useNav()

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
