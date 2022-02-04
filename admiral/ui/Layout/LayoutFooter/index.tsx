import React from 'react'
import styles from '../Layout.module.scss'
import { useNav } from '@/admiral/navigation/NavContext'
import { FiSettings } from 'react-icons/fi'
import { ThemeSwitch, Tooltip } from '@/admiral/ui'
import { useTheme } from '@/admiral/theme'
import cn from 'classnames'

const LayoutFooter: React.FC = () => {
    const { collapsed } = useNav()
    const { themeName } = useTheme()
    const mode = themeName === 'dark' ? 'Light' : 'Dark'

    return (
        <footer className={styles.panel_Footer}>
            <div className={cn(styles.user, { [styles.user__Collapsed]: collapsed })}>
                <div className={styles.user_Info}>
                    <div className={styles.user_Name}>Веб Секрет</div>
                    <div className={styles.user_Email}>info@websecret.by</div>
                </div>

                <Tooltip
                    trigger="mouseenter"
                    placement="right"
                    content={
                        <div className={styles.themeSwitch}>
                            <div className={styles.themeSwitch_Text}>Switch to {mode} Mode</div>
                            <ThemeSwitch />
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
                    <button type="button" className={styles.user_Settings}>
                        <FiSettings />
                    </button>
                </Tooltip>
            </div>
        </footer>
    )
}

export default LayoutFooter
