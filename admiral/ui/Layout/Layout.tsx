import React, { useMemo } from 'react'
import styles from './Layout.module.scss'
import LayoutHeader from './LayoutHeader'
import LayoutAside from './LayoutAside'
import LayoutFooter from './LayoutFooter'
import { useNav } from '../../navigation/NavContext'
import { useConfig } from '../../config/ConfigContext'
import { useGetIdentity } from '../../auth'
import cn from 'classnames'

export const Layout: React.FC = ({ children }) => {
    const { collapsed } = useNav()
    const { logo, asideContent, menuPopupExtraComponents } = useConfig()
    const { loaded, identity } = useGetIdentity()
    const user = useMemo(() => (loaded ? identity : null), [loaded, identity])

    return (
        <div
            className={cn(styles.wrap, {
                [styles.wrap__Collapsed]: collapsed,
            })}
        >
            <div className={styles.panel}>
                <LayoutHeader logo={logo} />
                <LayoutAside user={user}>{asideContent}</LayoutAside>
                <LayoutFooter user={user} menuPopupExtraComponents={menuPopupExtraComponents} />
            </div>

            <main className={styles.content}>{children}</main>
        </div>
    )
}
