import React from 'react'
import styles from '../Layout.module.scss'
import { FiMenu, FiX } from 'react-icons/fi'
import { useNav } from '@/src/context/NavContext'
import { useTheme } from '@/admiral/theme'
import cn from 'classnames'

const LayoutAside: React.FC = ({ children }) => {
    const { themeName } = useTheme()
    const { visible, toggle } = useNav()

    return (
        <>
            <button
                className={cn(styles.toggle, { [styles.toggle__Inverted]: themeName === 'dark' })}
                onClick={toggle}
            >
                {visible ? <FiX /> : <FiMenu />}
            </button>

            <aside className={styles.aside}>
                <div className={styles.aside_Content}>{children}</div>
            </aside>

            <div className={cn(styles.modal, { [styles.modal__Visible]: visible })}>
                <div className={styles.modal_Layout}>
                    <div className={styles.modal_Inner}>{children}</div>
                </div>
            </div>
        </>
    )
}

export default LayoutAside
