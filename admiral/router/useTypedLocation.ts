import { useLocation, type Location } from 'react-router-dom'
import type { RouterLocationState } from './interfaces'

/**
 * `useLocation` narrowed to the state admiral's navigation writes
 * (react-router itself types `location.state` as `any`).
 */
export default function useTypedLocation() {
    return useLocation() as Location<RouterLocationState>
}
