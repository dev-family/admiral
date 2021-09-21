import React, { useContext, useState, createContext, useCallback } from 'react'
import { useLocalStorage } from '@/src/hooks'
import noScroll from 'no-scroll'

export interface ContextState {
    visible: boolean
    toggle: () => void
    open: () => void
    close: () => void
    collapsed: boolean
    toggleCollapsed: () => void
}

const NavContext = createContext({} as ContextState)

type NavProviderProps = {
    children: React.ReactNode
}

export function NavProvider({ children }: NavProviderProps) {
    const [collapsed, setCollapsed] = useLocalStorage('admiral-menu-collapsed', false)
    const [visible, setVisible] = useState(false)

    const toggleCollapsed = useCallback(() => {
        setCollapsed((prev) => !prev)
    }, [])

    const toggle = useCallback(() => {
        setVisible((prev) => !prev)
        noScroll.toggle()
    }, [])

    const open = useCallback(() => {
        setVisible(true)
        noScroll.on()
    }, [])

    const close = useCallback(() => {
        setVisible(false)
        noScroll.off()
    }, [])

    return (
        <NavContext.Provider
            value={{
                visible,
                toggle,
                open,
                close,
                collapsed,
                toggleCollapsed,
            }}
        >
            {children}
        </NavContext.Provider>
    )
}

export function useNav() {
    return useContext(NavContext)
}
