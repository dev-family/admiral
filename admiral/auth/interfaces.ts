export interface AuthProvider {
    login: (params: any) => Promise<any>
    logout: (params: any) => Promise<void | false | string>
    checkAuth: (params: any) => Promise<void>
    getIdentity: () => Promise<UserIdentity>
    [key: string]: any
}

export interface UserIdentity {
    id: string | number
    fullName?: string
    avatar?: string
    email?: string
    [key: string]: any
}

export interface UserContextStateValue {
    loading: boolean
    loaded: boolean
    identity: UserIdentity | null
    error?: any
}

export interface UserContextValue {
    user: UserContextStateValue
    setUser: React.Dispatch<React.SetStateAction<UserContextStateValue>>
}
