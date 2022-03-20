import React, { useRef, forwardRef } from 'react'
import RcSwitch from 'rc-switch'
import type { SwitchChangeEventHandler, SwitchClickEventHandler } from 'rc-switch'
import { AiOutlineLoading } from 'react-icons/ai'
import mergeRefs from 'react-merge-refs'
import cn from 'classnames'
import styles from './Switch.module.scss'

export type SwitchSize = 'S' | 'M' | 'L'

export interface SwitchProps
    extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange' | 'onClick'> {
    size?: SwitchSize
    className?: string
    prefixCls?: string
    disabled?: boolean
    loading?: boolean
    checkedChildren?: React.ReactNode
    unCheckedChildren?: React.ReactNode
    onChange?: SwitchChangeEventHandler
    onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>
    onClick?: SwitchClickEventHandler
    tabIndex?: number
    checked?: boolean
    defaultChecked?: boolean
    loadingIcon?: React.ReactNode
    style?: React.CSSProperties
    title?: string
}

export const Switch = forwardRef(
    (
        {
            prefixCls: customPrefixCls,
            size = 'M',
            loading,
            className = '',
            disabled,
            ...props
        }: SwitchProps,
        buttonRef,
    ) => {
        const ref = useRef<HTMLButtonElement>(null)

        const prefixCls = cn('switch', customPrefixCls)
        const loadingIcon = (
            <div className={`${prefixCls}-handle`}>
                {loading && <AiOutlineLoading className={`${prefixCls}-loading-icon`} />}
            </div>
        )

        const classes = cn(
            styles.switch,
            {
                [styles.switch__SizeS]: size === 'S',
                [styles.switch__SizeL]: size === 'L',
            },
            className,
        )

        return (
            <RcSwitch
                {...props}
                prefixCls={prefixCls}
                className={classes}
                disabled={disabled || loading}
                ref={mergeRefs([ref, buttonRef])}
                loadingIcon={loadingIcon}
            />
        )
    },
)
