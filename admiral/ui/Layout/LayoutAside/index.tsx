import React, { useState } from 'react'
import { Button, ThemeSwitch } from '../../../ui'
import { useNav } from '../../../navigation/NavContext'
import cn from 'classnames'
import { UserCard } from '../../../auth/components/User'
import { useLogout } from '../../../auth'
import { UserIdentity } from '../../../auth/interfaces'
import { FiLogOut } from 'react-icons/fi'
import styles from '../Layout.module.scss'

function LayoutAside({
    user,
    children,
}: {
    user: UserIdentity | null
    children?: React.ReactNode
}) {
    const { visible, menu: Menu } = useNav()

    return (
        <>
            <div className={cn(styles.panel_Content)}>
                <Menu />
                {children}
            </div>

            <div className={cn(styles.modal, { [styles.modal__Visible]: visible })}>
                <div className={styles.modal_Layout}>
                    <div className={styles.modal_Inner}>
                        {user && (
                            <div className={styles.modal_User}>
                                <UserCard {...user}>
                                    <div className={styles.modal_UserControls}>
                                        <ThemeSwitch />
                                        <Logout />
                                    </div>
                                </UserCard>
                            </div>
                        )}

                        <div className={styles.modal_Menu}>
                            <Menu />
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

function Logout() {
    const { toggle } = useNav()
    const logout = useLogout()
    const [loading, setLoading] = useState(false)

    const onClick = () => {
        setLoading(true)
        return logout().finally(() => {
            setLoading(false)
            toggle()
        })
    }

    return (
        <Button
            type="button"
            view="secondary"
            iconLeft={<FiLogOut />}
            loading={loading}
            onClick={onClick}
        />
    )
}

export default LayoutAside
