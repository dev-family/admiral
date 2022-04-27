import React, { forwardRef, memo } from 'react'
import cn from 'classnames'
import styles from './Typography.module.scss'

export interface TypographyProps {
    id?: string
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
}

interface InternalTypographyProps extends TypographyProps {
    component?: string
}

const Typography = forwardRef(
    (
        { component = 'article', className, children, ...restProps }: InternalTypographyProps,
        ref,
    ) => {
        const Component = component as any

        return (
            <Component className={cn(styles.typography, className)} ref={ref} {...restProps}>
                {children}
            </Component>
        )
    },
)

export default memo(Typography) as typeof Typography
