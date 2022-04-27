import type { TypographyProps } from './Typography'

export type BaseType = 'secondary' | 'success' | 'warning' | 'danger'

export interface BlockProps extends TypographyProps {
    title?: string
    type?: BaseType
    // decorations
    code?: boolean
    mark?: boolean
    underline?: boolean
    delete?: boolean
    strong?: boolean
    italic?: boolean
}
