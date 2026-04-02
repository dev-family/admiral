import React from 'react'
import styles from './TopToolbar.module.scss'

export function TopToolbar({ children }: { children?: React.ReactNode }) {
    return <div className={styles.toolbar}>{children}</div>
}
