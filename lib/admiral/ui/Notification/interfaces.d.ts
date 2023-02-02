/// <reference types="react" />
export declare type NotificationPlacement = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';
export declare type IconType = 'success' | 'info' | 'error' | 'warning';
export interface NotificationContentProps {
    icon?: React.ReactNode;
    message: React.ReactNode;
    description?: React.ReactNode;
    type?: IconType;
    closable?: boolean;
}
export interface NotificationProps extends NotificationContentProps {
    placement?: NotificationPlacement;
    top?: number;
    bottom?: number;
    duration?: number | null;
    message: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    readonly type?: IconType;
}
