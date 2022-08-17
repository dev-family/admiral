import React, { createContext, useContext, useState } from 'react'
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

export const UserContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<UserContextStateValue>({
        loading: true,
        loaded: false,
        identity: null,
    })

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export function useUserContext() {
    return useContext(UserContext)
}
