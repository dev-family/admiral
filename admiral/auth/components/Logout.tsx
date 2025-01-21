import React from 'react'
import { useNav } from '../../navigation/NavContext'
import { useLocaleProvider } from '../../locale'
import { useSafeSetState } from '../../utils/hooks'
import { Button } from '../../ui/Button'
import useLogout from '../useLogout'
import styles from './Logout.module.scss'

export function Logout() {
    const { toggle } = useNav()
    const logout = useLogout()
    const [loading, setLoading] = useSafeSetState(false)
    const { auth: locale } = useLocaleProvider()

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
            {locale.logout}
        </Button>
    )
}
