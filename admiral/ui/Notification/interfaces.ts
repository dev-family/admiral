export type NotificationPlacement =
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight'

export type IconType = 'success' | 'info' | 'error' | 'warning'

export interface NotificationContentProps {
    icon?: React.ReactNode
    message: React.ReactNode
    description?: React.ReactNode
    type?: IconType
}

export interface NotificationProps extends NotificationContentProps {
    placement?: NotificationPlacement
    top?: number
    bottom?: number
    closable?: boolean
    duration?: number | null
    message: React.ReactNode
    description?: React.ReactNode
    icon?: React.ReactNode
    readonly type?: IconType
}
