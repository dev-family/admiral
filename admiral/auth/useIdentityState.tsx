import { UserIdentity } from './interfaces'
import { useUserContext } from './UserContext'

const useIdentityState = (): UserIdentity | null => {
    const {
        user: { identity },
    } = useUserContext()

    return identity
}

export default useIdentityState
