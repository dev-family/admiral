import React from 'react'
import styles from './Layout.module.scss'
import LayoutHeader from './LayoutHeader'
import LayoutAside from './LayoutAside'
import LayoutFooter from './LayoutFooter'
import { useNav } from '@/src/context/NavContext'
import cn from 'classnames'

export const Layout: React.FC<{ asideContent?: React.ReactNode }> = ({
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
                <LayoutHeader />
                <LayoutAside>{asideContent}</LayoutAside>
                <LayoutFooter />
            </div>

            <main className={styles.content}>{children}</main>
        </div>
    )
}
