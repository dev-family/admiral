import React, { useCallback } from 'react'
import styles from './Input.module.scss'

type InputProps = {
    value: string
    onChange: (value: string) => void
}

export const Input: React.FC<InputProps> = ({ value, onChange }) => {
    const handleChange = useCallback(
        (e) => {
            onChange(e.target.value)
        },
        [onChange],
    )

    return <input type="text" value={value} onChange={handleChange} className={styles.wrapper} />
}
