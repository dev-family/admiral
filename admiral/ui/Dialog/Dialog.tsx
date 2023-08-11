import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTheme } from '../../theme'
import { FiX } from 'react-icons/fi'
import RcDialog from 'rc-dialog'
import cn from 'classnames'
import type { DialogProps } from './interfaces'
import styles from './Dialog.module.scss'

export type DialogRef = {
    bodyElement: () => HTMLElement
}

export const Dialog = forwardRef<DialogRef, DialogProps>((props, ref) => {
    const { visible, onClose, title, children, ...restProps } = props

    const bodyRef = useRef<HTMLDivElement>(null)
    const getContainer = () => document.querySelector('body') as HTMLBodyElement

    useImperativeHandle(
        ref,
        () => ({
            bodyElement: () => bodyRef.current as HTMLElement,
        }),
        [bodyRef.current],
    )

    const { themeClassNames } = useTheme()

    return (
        <RcDialog
            prefixCls="dialog"
            visible={visible}
            title={title}
            onClose={() => onClose && onClose()}
            closeIcon={<FiX />}
            getContainer={getContainer}
            animation="fade-slide"
            maskAnimation="fade"
            rootClassName={cn(
                themeClassNames.color.primary,
                themeClassNames.control,
                themeClassNames.font,
                themeClassNames.shadow,
                themeClassNames.size,
                themeClassNames.space,
                styles.wrapper,
            )}
            destroyOnClose={true}
            {...restProps}
        >
            {children}
        </RcDialog>
    )
})

Dialog.defaultProps = {}
