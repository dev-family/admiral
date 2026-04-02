import type { Placement } from '@floating-ui/react'

export interface TooltipProps {
    // Content
    content?: React.ReactNode
    children: React.ReactElement

    // Positioning
    placement?: Placement
    offset?: number | [number, number]

    // Behavior
    trigger?: 'hover' | 'click'
    interactive?: boolean
    disabled?: boolean
    hideOnClick?: boolean

    // Controlled mode
    open?: boolean
    onOpenChange?: (open: boolean) => void

    // Visual
    arrow?: boolean
    mode?: 'custom'
    invertTheme?: boolean
    contentClassName?: string

    // Portal
    root?: HTMLElement | null | (() => HTMLElement | null)
}
