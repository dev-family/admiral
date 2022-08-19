import React, { useMemo, useRef } from 'react'
import { config, useTransition } from 'react-spring'
import cn from 'classnames'
import ScrollNumber from './ScrollNumber'
import { cloneElement } from './utils'
import { useTheme } from '../../theme'

import { BadgeProps } from './interfaces'
import styles from './Badge.module.scss'

export const Badge: React.FC<BadgeProps> = ({
    children,
    status,
    count = null,
    overflowCount = 99,
    dot = false,
    size,
    view,
    className,
    showZero = false,
    ...restProps
}) => {
    const { themeClassNames, themeName } = useTheme()

    const numberedDisplayCount = (
        (count as number) > (overflowCount as number) ? `${overflowCount}+` : count
    ) as string | number | null

    const isZero = numberedDisplayCount === '0' || numberedDisplayCount === 0

    const showAsDot = dot && !isZero

    const mergedCount = showAsDot ? '' : numberedDisplayCount

    const isHidden = useMemo(() => {
        const isEmpty = mergedCount === null || mergedCount === undefined || mergedCount === ''
        return (isEmpty || (isZero && !showZero)) && !showAsDot
    }, [mergedCount, isZero, showZero, showAsDot])

    // Count should be cache in case hidden change it
    const countRef = useRef(count)
    if (!isHidden) {
        countRef.current = count
    }
    const livingCount = countRef.current

    // We need cache count since remove motion should not change count display
    const displayCountRef = useRef(mergedCount)
    if (!isHidden) {
        displayCountRef.current = mergedCount
    }
    const displayCount = displayCountRef.current

    // We will cache the dot status to avoid shaking on leaved motion
    const isDotRef = useRef(showAsDot)
    if (!isHidden) {
        isDotRef.current = showAsDot
    }

    // >>> Display Component
    const displayNode =
        !livingCount || typeof livingCount !== 'object' ? undefined : cloneElement(livingCount)

    const badgeClassName = cn(
        styles.badge,
        {
            [themeClassNames.color.accent]:
                status !== 'system' && view === 'filled' && themeName === 'light',
            [styles.badge__SizeXS]: size === 'XS',
            [styles.badge__SizeS]: size === 'S',
            [styles.badge__SizeM]: size === 'M',
            [styles.badge__SizeL]: size === 'L',
            [styles.badge__ViewFilled]: view === 'filled',
            [styles.badge__ViewStroked]: view === 'stroked',
            [styles.badge__StatusNormal]: status === 'normal',
            [styles.badge__StatusSuccess]: status === 'success',
            [styles.badge__StatusError]: status === 'error',
            [styles.badge__StatusWarning]: status === 'warning',
            [styles.badge__StatusSystem]: status === 'system',
            [styles.badge__NotWrapper]: !children,
        },
        className,
    )

    const noWrapper = !children
    const transitions = useTransition(!isHidden, {
        initial: {
            opacity: 1,
            scale: 1,
            translateX: noWrapper ? 0 : '50%',
            translateY: noWrapper ? 0 : '-50%',
        },
        from: {
            opacity: 0,
            scale: 0,
            translateX: noWrapper ? 0 : '50%',
            translateY: noWrapper ? 0 : '-50%',
        },
        enter: {
            opacity: 1,
            scale: 1,
            translateX: noWrapper ? 0 : '50%',
            translateY: noWrapper ? 0 : '-50%',
        },
        leave: {
            opacity: 0,
            scale: 0,
            translateX: noWrapper ? 0 : '50%',
            translateY: noWrapper ? 0 : '-50%',
        },
        reverse: !isHidden,
        config: { ...config.stiff, duration: 160 },
    })

    return (
        <div {...restProps} className={badgeClassName}>
            <div className={themeClassNames.color.primary}>{children}</div>
            {transitions((trStyles, item) => {
                const isDot = isDotRef.current

                const scrollNumberCls = cn({
                    [styles.dot]: isDot,
                    [styles.count]: !isDot,
                })

                return (
                    item && (
                        <ScrollNumber
                            show={!isHidden}
                            className={scrollNumberCls}
                            count={displayCount}
                            style={trStyles}
                            key="scrollNumber"
                        >
                            {displayNode}
                        </ScrollNumber>
                    )
                )
            })}
        </div>
    )
}

Badge.defaultProps = {
    size: 'M',
    view: 'filled',
    status: 'normal',
}
