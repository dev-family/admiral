import { useEffect, useState } from 'react'
import useCheckAuth from './useCheckAuth'

interface State {
    loading: boolean
    loaded: boolean
    authenticated?: boolean
}

const emptyParams = {}

const useAuthState = (params: any = emptyParams): State => {
    const [state, setState] = useState({
        loading: true,
        loaded: false,
        authenticated: true, // optimistic
    })
    const checkAuth = useCheckAuth()
    useEffect(() => {
        checkAuth(params, false)
            .then(() => {
                setState({ loading: false, loaded: true, authenticated: true })
            })
            .catch(() => setState({ loading: false, loaded: true, authenticated: false }))
    }, [checkAuth, params, setState])
    return state
}

export default useAuthState
