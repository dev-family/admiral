import React, { forwardRef, useCallback } from 'react'
import { useTheme } from '../../theme'
import { FiX } from 'react-icons/fi'
import RcDialog from 'rc-dialog'
import cn from 'classnames'
import type { DialogProps } from './interfaces'
import styles from './Dialog.module.scss'

export const Dialog: React.FC<DialogProps> = (props) => {
    const { visible, onClose, title, children, ...restProps } = props

    const getContainer = useCallback(() => document.querySelector('body') as HTMLBodyElement, [])
    const handleClose = useCallback(() => onClose?.(), [])

    const { themeClassNames } = useTheme()

    return (
        <RcDialog
            prefixCls="dialog"
            visible={visible}
            title={title}
            onClose={handleClose}
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
}

Dialog.defaultProps = {}
