/**
 * Returns the theme container element for use as popup/portal root.
 * Falls back to document.body if the theme container is not found.
 */
export function getPopupContainer(): HTMLElement {
    return (document.querySelector('#root > .Theme') as HTMLElement) || document.body
}
