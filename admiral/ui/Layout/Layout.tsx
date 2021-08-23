import React from 'react'
import styles from './Layout.module.scss'
import LayoutHeader from './LayoutHeader'
import LayoutAside from './LayoutAside'

export const Layout: React.FC<{ asideContent?: React.ReactNode }> = ({
    asideContent,
    children,
}) => {
    return (
        <div className={styles.wrap}>
            <LayoutHeader />

            <LayoutAside>{asideContent}</LayoutAside>

            <main className={styles.content}>{children}</main>
        </div>
    )
}
