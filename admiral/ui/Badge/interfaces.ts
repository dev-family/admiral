import { tuple } from '../../utils/type'

export const BadgeStatusTypes = tuple('success', 'normal', 'error', 'system', 'warning')
export type BadgeStatusType = typeof BadgeStatusTypes[number]

export const BadgeSizeTypes = tuple('XS', 'S', 'M', 'L')
export type BadgeSizeType = typeof BadgeSizeTypes[number]

export const BadgeViewTypes = tuple('filled', 'stroked')
export type BadgeViewType = typeof BadgeViewTypes[number]

export interface BadgeProps {
    /** Number to show in badge */
    count?: React.ReactNode
    showZero?: boolean
    /** Max count to show */
    overflowCount?: number
    /** Whether to show red dot without number */
    dot?: boolean
    className?: string
    status?: BadgeStatusType
    view?: BadgeViewType
    size?: BadgeSizeType
    children?: React.ReactNode
}
