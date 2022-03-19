import React, { forwardRef, useRef, memo } from 'react'
import { Spin } from '@/admiral/ui'
import { ButtonProps } from './interfaces'
import styles from './Button.module.scss'
import mergeRefs from 'react-merge-refs'
import cn from 'classnames'

const Button = forwardRef((props: ButtonProps, buttonRef) => {
    const {
        component: Component = 'button',
        className,
        size = 'M',
        view = 'primary',
        loading,
        disabled = false,
        iconLeft,
        iconRight,
        children,
        ...rest
    } = props
    const withLoader = typeof loading === 'boolean'
    const ref = useRef<typeof Component>(null)

    const onlyIcon =
        (!!iconLeft && !iconRight && !children) || (!!iconRight && !iconLeft && !children)

    const content = (
        <span className={styles.content}>
            {iconLeft && <span className={cn(styles.icon, styles.icon__Left)}>{iconLeft}</span>}
            {children}
            {iconRight && <span className={cn(styles.icon, styles.icon__Right)}>{iconRight}</span>}
        </span>
    )

    return (
        <Component
            ref={mergeRefs([ref, buttonRef])}
            className={cn(
                styles.button,
                {
                    [styles.disabled]: loading ? false : disabled,
                    [styles.loading]: withLoader ? loading : false,
                    [styles.viewPrimary]: view === 'primary',
                    [styles.viewSecondary]: view === 'secondary',
                    [styles.viewGhost]: view === 'ghost',
                    [styles.viewClear]: view === 'clear',
                    [styles.sizeL]: size === 'L',
                    [styles.sizeS]: size === 'S',
                    [styles.sizeXS]: size === 'XS',
                    [styles.onlyIcon]: onlyIcon,
                },
                className,
            )}
            {...(Component === 'button' && { disabled: disabled || !!loading })}
            {...rest}
        >
            {withLoader ? (
                <Spin spinning={loading} className={styles.spinner}>
                    {content}
                </Spin>
            ) : (
                content
            )}
        </Component>
    )
})

export default memo(Button) as typeof Button
