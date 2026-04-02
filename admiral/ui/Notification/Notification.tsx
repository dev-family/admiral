import React, { useEffect, useRef } from 'react'
import cn from 'classnames'
import { useNotification } from 'rc-notification'
import type { NotificationAPI } from 'rc-notification/es/hooks/useNotification'
import { NotificationContentProps, NotificationPlacement, NotificationProps } from './interfaces'
import { createRoot } from 'react-dom/client'

import { FiCheckCircle, FiInfo, FiXCircle, FiAlertCircle, FiX } from 'react-icons/fi'

import styles from './Notification.module.scss'
import { getPlacementStyle, getMotion } from './util'
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

export function NotificationContent({
    icon,
    type,
    message,
    description,
    closable,
}: NotificationContentProps) {
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

// Imperative notification manager using rc-notification v5 hook API
let notificationApi: NotificationAPI | null = null
let notificationRoot: ReturnType<typeof createRoot> | null = null
let keyCounter = 0

function NotificationHolder() {
    const [api, contextHolder] = useNotification({
        prefixCls,
        closable: true,
        closeIcon: <FiX />,
        style: (placement) => getPlacementStyle(placement, defaultTop, defaultBottom),
        motion: getMotion(prefixCls),
    })
    const apiRef = useRef(api)
    apiRef.current = api

    useEffect(() => {
        notificationApi = apiRef.current
    }, [])

    return contextHolder
}

function ensureNotificationHolder() {
    if (notificationRoot) return
    const container = document.createElement('div')
    container.id = 'notification-holder'
    document.body.appendChild(container)
    notificationRoot = createRoot(container)
    notificationRoot.render(
        <ThemeProvider>
            <NotificationHolder />
        </ThemeProvider>,
    )
}

export const Notification = (args: NotificationProps) => {
    ensureNotificationHolder()
    const {
        icon,
        type,
        description,
        message,
        duration,
        closable = true,
        placement = defaultPlacement,
    } = args

    // Queue the notification to allow the holder to mount
    const show = () => {
        if (notificationApi) {
            notificationApi.open({
                key: `notification-${++keyCounter}`,
                placement,
                content: (
                    <ThemeProvider>
                        <NotificationContent
                            icon={icon}
                            type={type}
                            message={message}
                            description={description}
                            closable={closable}
                        />
                    </ThemeProvider>
                ),
                duration: duration ?? 4.5,
                closable,
                closeIcon: <FiX />,
            })
        } else {
            // If the API isn't ready yet, retry after a tick
            requestAnimationFrame(show)
        }
    }

    show()
}
