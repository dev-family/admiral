import { Location } from '../../router/interfaces'

const NAVIGATION_STATE_KEY = 'admiral_navigation_from'

export interface SavedNavigationState {
    pathname: string
    search: string
    timestamp: number
}

/**
 * Save the current location to sessionStorage for later retrieval
 * This allows navigation state to persist through external redirects
 */
export function saveNavigationFrom(location: Location): void {
    try {
        const state: SavedNavigationState = {
            pathname: location.pathname,
            search: location.search || '',
            timestamp: Date.now(),
        }
        sessionStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state))
    } catch (e) {
        console.warn('Failed to save navigation state:', e)
    }
}

/**
 * Get the saved navigation location from either state or sessionStorage
 * Prioritizes state.from, falls back to sessionStorage
 * Returns null if nothing is found or if the saved state is too old (>1 hour)
 */
export function getNavigationFrom(
    stateFrom?: Location,
): { pathname: string; search: string } | null {
    if (stateFrom?.pathname) {
        return {
            pathname: stateFrom.pathname,
            search: stateFrom.search || '',
        }
    }

    try {
        const saved = sessionStorage.getItem(NAVIGATION_STATE_KEY)
        if (!saved) return null

        const state: SavedNavigationState = JSON.parse(saved)

        // Check if the saved state is not too old (1 hour)
        const ONE_HOUR = 60 * 60 * 1000
        if (Date.now() - state.timestamp > ONE_HOUR) {
            clearNavigationFrom()
            return null
        }

        return {
            pathname: state.pathname,
            search: state.search,
        }
    } catch (e) {
        console.warn('Failed to retrieve navigation state:', e)
        return null
    }
}

/**
 * Clear the saved navigation state from sessionStorage
 */
export function clearNavigationFrom(): void {
    try {
        sessionStorage.removeItem(NAVIGATION_STATE_KEY)
    } catch (e) {
        console.warn('Failed to clear navigation state:', e)
    }
}
