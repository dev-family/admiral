import React, { memo } from 'react'
import cn from 'classnames'
import styles from './Typography.module.scss'

export interface TypographyProps {
    id?: string
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
}

interface InternalTypographyProps extends TypographyProps {
    component?: React.ElementType
}

function Typography({
    component = 'article',
    className,
    children,
    ref,
    ...restProps
}: InternalTypographyProps & { ref?: React.Ref<HTMLElement> }) {
    const Component = component

    return (
        <Component className={cn(styles.typography, className)} ref={ref} {...restProps}>
            {children}
        </Component>
    )
}

export default memo(Typography)
