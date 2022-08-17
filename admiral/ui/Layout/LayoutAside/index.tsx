import React from 'react'
import { Menu, Button, ThemeSwitch } from '../../../ui'
import { useNav } from '../../../navigation/NavContext'
import cn from 'classnames'
import { UserCard } from '../../../auth/components/User'
import { useLogout } from '../../../auth'
import { useSafeSetState } from '../../../utils/hooks'
import { UserIdentity } from '../../../auth/interfaces'
import { FiLogOut } from 'react-icons/fi'
import styles from '../Layout.module.scss'

const LayoutAside: React.FC<{ user: UserIdentity | null }> = ({ user, children }) => {
    const { visible, items } = useNav()

    return (
        <>
            <div className={cn(styles.panel_Content)}>
                <Menu items={items} />
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
                            <Menu type="modal" items={items} />
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
            type="button"
            view="secondary"
            iconLeft={<FiLogOut />}
            loading={loading}
            onClick={onClick}
        />
    )
}

export default LayoutAside
