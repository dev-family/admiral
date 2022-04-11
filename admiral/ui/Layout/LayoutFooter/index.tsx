import React, { useMemo } from 'react'
import { useNav } from '../../../navigation/NavContext'
import { ThemeSwitch, Tooltip, Button } from '../../../ui'
import { FiSettings } from 'react-icons/fi'
import cn from 'classnames'
import { useGetIdentity, useLogout } from '../../../auth'
import { UserCard } from '../../../auth/components/User'
import { useSafeSetState } from '../../../utils/hooks'
import styles from '../Layout.module.scss'

const LayoutFooter: React.FC = () => {
    const { collapsed } = useNav()
    const { loaded, identity } = useGetIdentity()
    const user = useMemo(() => (loaded ? identity : null), [loaded, identity])

    return (
        <footer className={styles.panel_Footer}>
            <div className={cn(styles.user, { [styles.user__Collapsed]: collapsed })}>
                <Tooltip
                    trigger="mouseenter"
                    placement="right"
                    content={
                        <div className={styles.userTooltip}>
                            {user && <Logout />}
                            <div className={styles.themeSwitch}>
                                <ThemeSwitch />
                            </div>
                        </div>
                    }
                    interactive
                    popperOptions={{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 34],
                                },
                            },
                        ],
                    }}
                >
                    {user ? (
                        <div>
                            <UserCard {...user} collapsed={collapsed} />
                        </div>
                    ) : (
                        <button type="button" className={styles.settings}>
                            <FiSettings />
                        </button>
                    )}
                </Tooltip>
            </div>
        </footer>
    )
}

export function Logout() {
    const { toggle } = useNav()
    const logout = useLogout()
    const [loading, setLoading] = useSafeSetState(false)

    const onClick = () => {
        setLoading(true)
        return logout().finally(() => {
            setLoading(false)
            toggle()
        })
    }

    return (
        <Button type="button" view="ghost" loading={loading} onClick={onClick}>
            Выход
        </Button>
    )
}

export default LayoutFooter
