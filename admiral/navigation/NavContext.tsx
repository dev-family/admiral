import React, { useContext, useState, createContext, useCallback } from 'react'
import { IMenuItem } from '../ui'
import { useLocalStorageState } from 'ahooks'
import noScroll from 'no-scroll'

export interface ContextState {
    visible: boolean
    toggle: () => void
    open: () => void
    close: () => void
    collapsed: boolean
    toggleCollapsed: () => void
    items: IMenuItem[]
}

const NavContext = createContext({} as ContextState)

type NavProviderProps = {
    items: IMenuItem[]
    children: React.ReactNode
}

export const menuCollapsedStorageKey = 'df_admin_menu_collapsed'

export function NavProvider({ items, children }: NavProviderProps) {
    const [collapsed, setCollapsed] = useLocalStorageState(menuCollapsedStorageKey, {
        defaultValue: false,
    })
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
                items,
            }}
        >
            {children}
        </NavContext.Provider>
    )
}

export function useNav() {
    return useContext(NavContext)
}
