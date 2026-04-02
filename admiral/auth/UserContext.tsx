import React, { createContext, useContext, useMemo, useState } from 'react'
import { UserContextStateValue, UserContextValue } from './interfaces'

const defaultValue: UserContextValue = {
    user: {
        loading: true,
        loaded: false,
        identity: null,
    },
    setUser: () => {},
}

export const UserContext = createContext<UserContextValue>(defaultValue)

export function UserContextProvider({ children }: { children?: React.ReactNode }) {
    const [user, setUser] = useState<UserContextStateValue>({
        loading: true,
        loaded: false,
        identity: null,
    })

    const value = useMemo(() => ({ user, setUser }), [user])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUserContext() {
    return useContext(UserContext)
}
