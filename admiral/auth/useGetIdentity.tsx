import { useEffect } from 'react'
import { useAuthProvider } from './AuthContext'
import { useUserContext } from './UserContext'

/**
 * Return the current user identity by calling authProvider.getIdentity() on mount
 */
const useGetIdentity = () => {
    const { user: state, setUser: setState } = useUserContext()
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

        const hasIdentity = !!state.identity
        if (!hasIdentity) {
            callAuthProvider()
        }
    }, [authProvider])

    return state
}

export default useGetIdentity
