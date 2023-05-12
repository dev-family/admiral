import React, { ReactNode } from 'react'
import { useNav } from '../../../navigation/NavContext'
import { ThemeSwitch, Tooltip, Button } from '../../../ui'
import { FiSettings } from 'react-icons/fi'
import cn from 'classnames'
import { useLogout } from '../../../auth'
import { UserCard } from '../../../auth/components/User'
import { useSafeSetState } from '../../../utils/hooks'
import { UserIdentity } from '../../../auth/interfaces'
import styles from '../Layout.module.scss'

interface Props {
    user: UserIdentity | null
    menuPopupExtraComponents: ReactNode
}

const LayoutFooter: React.FC<Props> = ({ user, menuPopupExtraComponents }) => {
    const { collapsed } = useNav()

    return (
        <footer className={styles.panel_Footer}>
            <div className={cn(styles.user, { [styles.user__Collapsed]: collapsed })}>
                <Tooltip
                    trigger="mouseenter"
                    placement="right"
                    content={
                        <div className={styles.userTooltip}>
                            <div className={styles.userTooltip__extra}>
                                {menuPopupExtraComponents ? menuPopupExtraComponents : <></>}
                            </div>
                            <div className={styles.userTooltip__default}>
                                {user && <Logout />}
                                <div className={styles.themeSwitch}>
                                    <ThemeSwitch />
                                </div>
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
        <Button
            className={styles.logout_button}
            type="button"
            view="ghost"
            loading={loading}
            onClick={onClick}
        >
            Выход
        </Button>
    )
}

export default LayoutFooter
