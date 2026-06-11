import type { Placement } from '@floating-ui/react'

export interface TooltipProps {
    // Content
    content?: React.ReactNode
    // The single child gets the trigger props and a merged ref cloned onto it
    children: React.ReactElement<Record<string, any>>

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
