import React from 'react'
import { Menu } from '@/admiral/ui'
import styles from '../Layout.module.scss'
import { useNav } from '@/admiral/navigation/NavContext'
import cn from 'classnames'

const LayoutAside: React.FC = ({ children }) => {
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
                        <Menu type="modal" items={items} />
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LayoutAside
