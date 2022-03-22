import React, { useState, useEffect } from 'react'
import styles from './Spin.module.scss'
import classNames from 'classnames'
import Icon from '@/assets/icons'
import { SpinProps } from './interfaces'

function shouldDelay(spinning?: boolean, delay?: number): boolean {
    return !!spinning && !!delay && !isNaN(Number(delay))
}

export const Spin: React.FC<SpinProps> = ({
    className,
    spinning = true,
    style,
    size = 'default',
    tip,
    delay = 0,
    wrapperClassName,
    children,
}) => {
    const shouldBeDelayed = shouldDelay(spinning, delay)
    const [state, setState] = useState({
        spinning: spinning && !shouldBeDelayed,
    })

    useEffect(() => {
        let timeoutId: NodeJS.Timeout
        if (state.spinning !== spinning) {
            const ms = spinning ? delay : 0
            timeoutId = setTimeout(() => setState({ spinning }), ms)
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId)
        }
    }, [spinning])

    const spinElement = (
        <div
            style={style}
            className={classNames(
                styles.spin,
                {
                    [styles.spin__Small]: size === 'small',
                    [styles.spin__Large]: size === 'large',
                },
                className,
            )}
        >
            <span className={styles.indicator}>
                <Icon name="spinner" />
            </span>
            {!!tip && <div className={styles.text}>{tip}</div>}
        </div>
    )

    if (children) {
        return (
            <div className={classNames(styles.wrapper, wrapperClassName)}>
                {state.spinning && <div key="loading">{spinElement}</div>}
                <div
                    className={classNames(styles.content, {
                        [styles.content__Blur]: state.spinning,
                    })}
                    key="container"
                >
                    {children}
                </div>
            </div>
        )
    }

    return spinElement
}
