import React, { useEffect } from 'react'
import cn from 'classnames'
import { useNotification } from 'rc-notification'
import type { NotificationAPI } from 'rc-notification/es/hooks/useNotification'
import { NotificationContentProps, NotificationPlacement, NotificationProps } from './interfaces'

import { FiCheckCircle, FiInfo, FiXCircle, FiAlertCircle, FiX } from 'react-icons/fi'

import styles from './Notification.module.scss'
import { getPlacementStyle, getMotion } from './util'
import { getPopupContainer } from '../../utils/helpers'

const prefixCls = 'notification'
const defaultPlacement: NotificationPlacement = 'topLeft'
const defaultTop = 24
const defaultBottom = 24
const defaultDuration = 4.5

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

// Imperative notification manager using rc-notification v5 hook API. The API instance is
// registered by <NotificationHost/>, mounted by <Admin> inside the app tree, so notices
// follow the active theme and custom presets (and survive HMR via effect re-registration).
let notificationApi: NotificationAPI | null = null
let pendingArgs: NotificationProps[] = []
let keyCounter = 0
// Placement offsets are holder-level in rc-notification (style applies to the placement
// container, not a single notice) and are re-read on every render: the latest call wins.
let currentTop = defaultTop
let currentBottom = defaultBottom

function openNotification(api: NotificationAPI, args: NotificationProps) {
    const {
        icon,
        type,
        description,
        message,
        duration = defaultDuration,
        closable = true,
        placement = defaultPlacement,
        top = defaultTop,
        bottom = defaultBottom,
    } = args

    currentTop = top
    currentBottom = bottom

    api.open({
        key: `notification-${++keyCounter}`,
        placement,
        content: (
            <NotificationContent
                icon={icon}
                type={type}
                message={message}
                description={description}
                closable={closable}
            />
        ),
        duration,
        closable,
        closeIcon: <FiX />,
    })
}

/**
 * Renders the rc-notification holder and registers the imperative API used by
 * `Notification()`. Mounted automatically by `<Admin>`. When using `Notification`
 * without `<Admin>`, mount it manually under your ThemeProvider.
 */
export function NotificationHost() {
    const [api, contextHolder] = useNotification({
        prefixCls,
        closable: true,
        closeIcon: <FiX />,
        getContainer: getPopupContainer,
        style: (placement) => getPlacementStyle(placement, currentTop, currentBottom),
        motion: getMotion(prefixCls),
    })

    useEffect(() => {
        notificationApi = api

        const queued = pendingArgs
        pendingArgs = []
        queued.forEach((args) => openNotification(api, args))

        return () => {
            if (notificationApi === api) {
                notificationApi = null
            }
        }
    }, [api])

    return contextHolder
}

export const Notification = (args: NotificationProps) => {
    if (notificationApi) {
        openNotification(notificationApi, args)
    } else {
        // Holder is not mounted yet (e.g. a call fired during the initial render) —
        // queued args are flushed as soon as <NotificationHost> mounts.
        pendingArgs.push(args)
    }
}
