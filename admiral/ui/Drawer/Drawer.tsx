import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { useTheme } from '../../../admiral/theme'
import { FiX } from 'react-icons/fi'
import RcDrawer from 'rc-drawer'
import cn from 'classnames'
import type { DrawerProps } from './interfaces'
import styles from './Drawer.module.scss'

export type DrawerRef = {
    bodyElement: () => HTMLElement
}

export const Drawer = forwardRef<DrawerRef, DrawerProps>((props, ref) => {
    const {
        visible,
        onClose,
        resetScrollPositionOnClose,
        getContainer: customizeGetContainer,
        bodyWrapperStyle,
        bodyStyle,
        headerStyle,
        footer,
        footerStyle,
        closable,
        title,
        width,
        height,
        placement,
        showMask,
        afterVisibleChange,
        children,
        ...restProps
    } = props
    const { themeClassNames } = useTheme()
    const bodyRef = useRef<HTMLDivElement>(null)
    const getContainer = () => document.querySelector('body') as HTMLBodyElement

    useImperativeHandle(
        ref,
        () => ({
            bodyElement: () => bodyRef.current as HTMLElement,
        }),
        [bodyRef.current],
    )

    const getContentWrapperStyle = useCallback(() => {
        const contentWrapperStyle: React.CSSProperties = {}
        if (placement === 'left' || placement === 'right') {
            const defaultWidth = 400
            contentWrapperStyle.maxWidth = typeof width === 'undefined' ? defaultWidth : width
        } else {
            const defaultHeight = 400
            contentWrapperStyle.maxHeight = typeof height === 'undefined' ? defaultHeight : height
        }
        return contentWrapperStyle
    }, [placement, width, height])

    const withHeader = !!title || closable
    const withFooter = !!footer

    return (
        <RcDrawer
            placement={placement}
            handler={false}
            open={visible}
            onClose={onClose}
            getContainer={customizeGetContainer || getContainer}
            level={null}
            wrapperClassName={cn(
                themeClassNames.color.primary,
                themeClassNames.control,
                themeClassNames.font,
                themeClassNames.shadow,
                themeClassNames.size,
                themeClassNames.space,
                styles.wrapper,
                { [styles.wrapper__NoMask]: !showMask },
            )}
            contentWrapperStyle={getContentWrapperStyle()}
            afterVisibleChange={(open) => {
                if (!open && resetScrollPositionOnClose) {
                    bodyRef.current?.scrollTo(0, 0)
                }
                afterVisibleChange?.(open)
            }}
            {...restProps}
        >
            <div className={styles.bodyWrapper} style={bodyWrapperStyle}>
                {withHeader && (
                    <div className={styles.header} style={headerStyle}>
                        {!!title && <div className={styles.header_Title}>{title}</div>}
                        {closable && (
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close"
                                className={styles.close}
                            >
                                <FiX />
                            </button>
                        )}
                    </div>
                )}

                <div className={styles.body} style={bodyStyle} ref={bodyRef}>
                    {children}
                </div>

                {withFooter && (
                    <div className={styles.footer} style={footerStyle}>
                        {footer}
                    </div>
                )}
            </div>
        </RcDrawer>
    )
})

Drawer.defaultProps = {
    resetScrollPositionOnClose: true,
    keyboard: true,
    placement: 'right',
    showMask: true,
    maskClosable: true,
    closable: true,
}
