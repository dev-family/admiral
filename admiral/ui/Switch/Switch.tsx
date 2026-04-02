import React, { useRef } from 'react'
import RcSwitch from 'rc-switch'
import { AiOutlineLoading } from 'react-icons/ai'
import { useMergeRefs } from '@floating-ui/react'
import cn from 'classnames'
import styles from './Switch.module.scss'
import { SwitchProps } from './interfaces'

export function Switch({
    prefixCls: customPrefixCls,
    size = 'M',
    loading,
    className = '',
    disabled,
    ref: buttonRef,
    ...props
}: SwitchProps & { ref?: React.Ref<any> }) {
    const ref = useRef<HTMLButtonElement>(null)
    const mergedRef = useMergeRefs([ref, buttonRef ?? null])

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
            ref={mergedRef}
            loadingIcon={loadingIcon}
        />
    )
}
