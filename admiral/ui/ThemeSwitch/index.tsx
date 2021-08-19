import React from 'react'
import { Switch } from '@consta/uikit/Switch'
import { useTheme } from '@/admiral/theme'

export const ThemeSwitch: React.FC = () => {
    const { themeName, setTheme } = useTheme()

    const handleChange = ({ checked }: { checked: boolean }) => setTheme(checked ? 'dark' : 'light')

    return <Switch label="Dark Mode" checked={themeName === 'dark'} onChange={handleChange} />
}
