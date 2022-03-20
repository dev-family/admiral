import React from 'react'
import styles from './TopToolbar.module.scss'

export const TopToolbar: React.FC = ({ children }) => {
    return <div className={styles.toolbar}>{children}</div>
}
