import React, { useEffect } from 'react'
import { useSafeSetState } from '../utils/hooks'
import useCheckAuth from './useCheckAuth'

interface State {
    loading: boolean
    loaded: boolean
    authenticated?: boolean
}

const emptyParams = {}

const useAuthState = (params: any = emptyParams): State => {
    const [state, setState] = useSafeSetState({
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
