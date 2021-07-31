import React from 'react'
import styles from './FormGroup.module.scss'

type FormGroupProps = {
    label: string
    error?: string
}

export const FormGroup: React.FC<FormGroupProps> = ({ children, label, error }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.label}>{label}</div>
            {children}
            {error && <div className={styles.error}>{error}</div>}
        </div>
    )
}
