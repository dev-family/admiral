import React from 'react'
import cn from 'classnames'
import Typography from './Typography'
import { BlockProps } from './interfaces'
import omit from 'rc-util/lib/omit'
import styles from './Typography.module.scss'

interface InternalBlockProps extends BlockProps {
    component: string
}

const Base = React.forwardRef((props: InternalBlockProps, ref: any) => {
    const { className, style, type, children, component, title, ...restProps } = props

    const textProps = omit(restProps, ['mark', 'code', 'delete', 'underline', 'strong', 'italic'])

    const wrappedContext = wrapperDecorations(restProps, <>{children}</>)

    return (
        <Typography
            className={cn(
                {
                    [styles.typography__Danger]: type === 'danger',
                    [styles.typography__Secondary]: type === 'secondary',
                    [styles.typography__Success]: type === 'success',
                    [styles.typography__Warning]: type === 'warning',
                },
                className,
            )}
            style={style}
            component={component}
            ref={ref}
            {...textProps}
        >
            {wrappedContext}
        </Typography>
    )
})

export default Base

function wrapperDecorations(
    { mark, code, underline, delete: del, strong, italic }: BlockProps,
    content: React.ReactNode,
) {
    let currentContent = content

    function wrap(needed: boolean | undefined, tag: string) {
        if (!needed) return

        currentContent = React.createElement(tag, {}, currentContent)
    }

    wrap(strong, 'strong')
    wrap(underline, 'u')
    wrap(del, 'del')
    wrap(code, 'code')
    wrap(mark, 'mark')
    wrap(italic, 'i')

    return currentContent
}
