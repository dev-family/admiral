import React from 'react'
import styles from '../Layout.module.scss'
import { useNav } from '../../../navigation/NavContext'
import { ThemeSwitch } from '../../../ui'
import cn from 'classnames'

const LayoutFooter: React.FC = () => {
    const { collapsed } = useNav()

    return (
        <footer className={styles.panel_Footer}>
            <div className={cn(styles.user, { [styles.user__Collapsed]: collapsed })}>
                <div className={styles.user_Info}>
                    {/* <div className={styles.user_Name}>Веб Секрет</div>
                    <div className={styles.user_Email}>info@websecret.by</div> */}
                </div>

                <div className={styles.themeSwitch}>
                    <ThemeSwitch />
                </div>
            </div>
        </footer>
    )
}

export default LayoutFooter
