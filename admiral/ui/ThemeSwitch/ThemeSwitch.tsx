import React from 'react'
import { useTheme } from '../../theme'
import { FiSun, FiMoon } from 'react-icons/fi'
import styles from './ThemeSwitch.module.scss'

export const ThemeSwitch: React.FC = () => {
    const { themeName, setTheme } = useTheme()

    const handleChange = () => setTheme(themeName === 'light' ? 'dark' : 'light')

    return (
        <button className={styles.button} type="button" onClick={handleChange}>
            <span className={styles.icon}>{themeName === 'light' ? <FiMoon /> : <FiSun />}</span>
        </button>
    )
}
