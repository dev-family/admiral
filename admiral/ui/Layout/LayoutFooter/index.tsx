import React, { ReactNode } from 'react'
import { useNav } from '../../../navigation/NavContext'
import { ThemeSwitch, Tooltip } from '../../../ui'
import { FiSettings } from 'react-icons/fi'
import cn from 'classnames'
import { UserCard } from '../../../auth/components/User'
import { Logout } from '../../../auth/components/Logout'
import { UserIdentity } from '../../../auth/interfaces'
import styles from '../Layout.module.scss'

interface Props {
    user: UserIdentity | null
    menuPopupExtraComponents?: ReactNode
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
                            {menuPopupExtraComponents ? (
                                <div className={styles.userTooltip__extra}>
                                    {menuPopupExtraComponents}
                                </div>
                            ) : (
                                <></>
                            )}
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

export default LayoutFooter
