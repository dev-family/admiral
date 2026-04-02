import React, {
    useContext,
    useState,
    createContext,
    useCallback,
    useMemo,
    ComponentType,
} from 'react'
import useLocalStorageState from '../utils/hooks/useLocalStorageState'

export interface ContextState {
    visible: boolean
    toggle: () => void
    open: () => void
    close: () => void
    collapsed: boolean
    toggleCollapsed: () => void
    menu: ComponentType
}

const NavContext = createContext({} as ContextState)

type NavProviderProps = {
    menu: ComponentType
    children: React.ReactNode
}

export const menuCollapsedStorageKey = 'df_admin_menu_collapsed'

export function NavProvider({ menu, children }: NavProviderProps) {
    // sidebar state
    const [collapsed, setCollapsed] = useLocalStorageState(menuCollapsedStorageKey, {
        defaultValue: false,
    })

    // mobile nav visibility
    const [visible, setVisible] = useState(false)

    const toggleCollapsed = useCallback(() => {
        setCollapsed((prev) => !prev)
    }, [])

    const toggle = useCallback(() => {
        setVisible((prev) => {
            document.body.style.overflow = prev ? '' : 'hidden'
            return !prev
        })
    }, [])

    const open = useCallback(() => {
        setVisible(true)
        document.body.style.overflow = 'hidden'
    }, [])

    const close = useCallback(() => {
        setVisible(false)
        document.body.style.overflow = ''
    }, [])

    const value = useMemo(
        () => ({ visible, toggle, open, close, collapsed, toggleCollapsed, menu }),
        [visible, collapsed, menu],
    )

    return <NavContext.Provider value={value}>{children}</NavContext.Provider>
}

export function useNav() {
    return useContext(NavContext)
}
