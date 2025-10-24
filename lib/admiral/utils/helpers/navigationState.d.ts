import { Location } from '../../router/interfaces';
export interface SavedNavigationState {
    pathname: string;
    search: string;
    timestamp: number;
}
/**
 * Save the current location to sessionStorage for later retrieval
 * This allows navigation state to persist through external redirects
 */
export declare function saveNavigationFrom(location: Location): void;
/**
 * Get the saved navigation location from either state or sessionStorage
 * Prioritizes state.from, falls back to sessionStorage
 * Returns null if nothing is found or if the saved state is too old (>1 hour)
 */
export declare function getNavigationFrom(stateFrom?: Location): {
    pathname: string;
    search: string;
} | null;
/**
 * Clear the saved navigation state from sessionStorage
 */
export declare function clearNavigationFrom(): void;
