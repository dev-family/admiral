import React from 'react'
import styles from '../Layout.module.scss'
import { useNav } from '@/src/context/NavContext'
import { FiSettings } from 'react-icons/fi'
import Icon from '@/assets/icons'
import cn from 'classnames'

const LayoutFooter: React.FC = () => {
    const { collapsed } = useNav()

    return (
        <footer className={styles.panel_Footer}>
            <div className={cn(styles.user, { [styles.user__Collapsed]: collapsed })}>
                <div className={styles.user_Info}>
                    <div className={styles.user_Name}>Веб Секрет</div>
                    <div className={styles.user_Email}>info@websecret.by</div>
                </div>

                <button type="button" className={styles.user_Settings}>
                    <FiSettings />
                </button>
            </div>
        </footer>
    )
}

export default LayoutFooter
