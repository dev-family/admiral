import React, { useCallback } from 'react'
import Tippy, { TippyProps } from '@tippyjs/react/headless'
import { useSpring, animated } from 'react-spring'
import styles from './Tooltip.module.scss'
import { useTheme } from '@/admiral/theme'
import { TooltipProps } from './interfaces'
import cn from 'classnames'

const config = { tension: 90, friction: 10, precision: 0.1, duration: 160 }
const initialStyles = { opacity: 0, transform: 'scale(0.6)' }

export const Tooltip = ({
    mode,
    onMount,
    onHide,
    content,
    children,
    ...tippyProps
}: TooltipProps) => {
    const appendTo = useCallback(
        () => document.querySelector('#root > .Theme') as HTMLDivElement,
        [],
    )

    const [props, setSpring] = useSpring(() => initialStyles)
    const { themeClassNames } = useTheme()

    const _onMount: TippyProps['onMount'] = (instance) => {
        setSpring({
            opacity: 1,
            transform: 'scale(1)',
            onRest: () => {},
            config,
        })
        if (onMount) onMount(instance)
    }

    const _onHide: TippyProps['onHide'] = (instance) => {
        const { unmount } = instance
        setSpring({
            ...initialStyles,
            onRest: unmount,
            config: { ...config, clamp: true },
        })

        if (onHide) onHide(instance)
    }

    return (
        <Tippy
            animation={true}
            onMount={_onMount}
            onHide={_onHide}
            render={(attrs) => {
                return (
                    <animated.div
                        style={props}
                        {...attrs}
                        className={cn(styles.tooltip, themeClassNames.color.invert, {
                            [styles.tooltip__Custom]: mode === 'custom',
                        })}
                    >
                        {content}
                        <div data-popper-arrow="" />
                    </animated.div>
                )
            }}
            appendTo={appendTo}
            {...tippyProps}
        >
            {children}
        </Tippy>
    )
}
