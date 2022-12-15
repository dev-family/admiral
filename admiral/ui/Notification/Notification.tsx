import * as React from 'react'
import cn from 'classnames'
import RcNotification from 'rc-notification'
import type { NotificationInstance as RCNotificationInstance } from 'rc-notification/lib/Notification'
import { NotificationContentProps, NotificationPlacement, NotificationProps } from './interfaces'

import { FiCheckCircle, FiInfo, FiXCircle, FiAlertCircle, FiX } from 'react-icons/fi'

import styles from './Notification.module.scss'
import { getPlacementStyle } from './util'
import { ThemeProvider } from '../../theme'

const prefixCls = 'notification'
const defaultPlacement: NotificationPlacement = 'topLeft'
const defaultTop = 24
const defaultBottom = 24

const typeToIcon = {
    success: FiCheckCircle,
    info: FiInfo,
    error: FiXCircle,
    warning: FiAlertCircle,
}

const notificationInstance: {
    [key: string]: Promise<RCNotificationInstance>
} = {}

export const NotificationContent: React.FC<NotificationContentProps> = ({
    icon,
    type,
    message,
    description,
    closable,
}) => {
    let iconNode: React.ReactNode = null

    if (icon) {
        iconNode = <span className={styles[`${prefixCls}-icon`]}>{icon}</span>
    } else if (type) {
        iconNode = React.createElement(typeToIcon[type] || null, {
            className: cn(styles[`${prefixCls}-icon`], styles[`${prefixCls}-icon-${type}`]),
        })
    }

    return (
        <div
            className={cn(styles[`${prefixCls}-content`], {
                [styles[`${prefixCls}-with-icon`]]: iconNode,
                [styles[`${prefixCls}-closable`]]: closable,
            })}
        >
            {iconNode}
            <div className={styles[`${prefixCls}-message`]}>{message}</div>
            {description && <div className={styles[`${prefixCls}-description`]}>{description}</div>}
        </div>
    )
}

function getNotificationInstance(
    args: NotificationProps,
    callback: (info: { prefixCls: string; instance: RCNotificationInstance }) => void,
) {
    const { placement = defaultPlacement, top = defaultTop, bottom = defaultBottom } = args

    const cacheKey = `${prefixCls}-${placement}`
    const cacheInstance = notificationInstance[cacheKey]

    if (cacheInstance) {
        Promise.resolve(cacheInstance).then((instance) => {
            callback({ prefixCls: `${prefixCls}-notice`, instance })
        })

        return
    }

    const notificationClass = cn(`${prefixCls}-${placement}`)

    notificationInstance[cacheKey] = new Promise((resolve) => {
        RcNotification.newInstance(
            {
                prefixCls,
                className: notificationClass,
                style: getPlacementStyle(placement, top, bottom),
            },
            (notification) => {
                resolve(notification)
                callback({
                    prefixCls: `${prefixCls}-notice`,
                    instance: notification,
                })
            },
        )
    })
}

const NotificationContentWrapper = (args: NotificationProps) => {
    return (
        <ThemeProvider>
            <NotificationContent {...args} />
        </ThemeProvider>
    )
}

export const Notification = (args: NotificationProps) => {
    return getNotificationInstance(args, ({ instance }) => {
        const { icon, type, description, message, duration, closable = true } = args

        instance.notice({
            closable,
            duration,
            closeIcon: <FiX />,
            content: (
                <NotificationContentWrapper
                    icon={icon}
                    type={type}
                    message={message}
                    description={description}
                />
            ),
        })
    })
}
