import { useEffect } from 'react'
import { useAuthProvider } from './AuthContext'
import { UserIdentity } from './interfaces'
import { useSafeSetState } from '../utils/hooks'

interface GetIdentityState {
    loading: boolean
    loaded: boolean
    identity: UserIdentity | null
    error?: any
}

/**
 * Return the current user identity by calling authProvider.getIdentity() on mount
 */
const useGetIdentity = () => {
    const [state, setState] = useSafeSetState<GetIdentityState>({
        loading: true,
        loaded: false,
        identity: null,
    })

    const authProvider = useAuthProvider()

    useEffect(() => {
        const callAuthProvider = async () => {
            try {
                const identity = await authProvider.getIdentity()
                setState({
                    loading: false,
                    loaded: true,
                    identity: identity || null,
                })
            } catch (error) {
                setState({
                    loading: false,
                    loaded: true,
                    identity: null,
                    error,
                })
            }
        }

        callAuthProvider()
    }, [authProvider, setState])

    return state
}

export default useGetIdentity
