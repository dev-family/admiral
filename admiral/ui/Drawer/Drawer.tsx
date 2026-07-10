import React, { useImperativeHandle, useRef } from 'react'
import { useTheme } from '../../../admiral/theme'
import { FiX } from 'react-icons/fi'
import RcDrawer from 'rc-drawer'
import cn from 'classnames'
import type { DrawerProps } from './interfaces'
import styles from './Drawer.module.scss'

export type DrawerRef = {
    bodyElement: () => HTMLElement
}

export function Drawer({
    ref,
    visible,
    onClose,
    resetScrollPositionOnClose = true,
    getContainer: customizeGetContainer,
    bodyWrapperStyle,
    bodyStyle,
    headerStyle,
    footer,
    footerStyle,
    closable = true,
    title,
    width,
    height,
    placement = 'right',
    showMask = true,
    maskClosable = true,
    keyboard = true,
    afterVisibleChange,
    children,
    ...restProps
}: DrawerProps & { ref?: React.Ref<DrawerRef> }) {
    const { themeClassNames } = useTheme()
    const bodyRef = useRef<HTMLDivElement>(null)
    const getContainer = () => document.querySelector('body') as HTMLBodyElement

    useImperativeHandle(
        ref,
        () => ({
            bodyElement: () => bodyRef.current as HTMLElement,
        }),
        [],
    )

    const withHeader = !!title || closable
    const withFooter = !!footer

    return (
        <RcDrawer
            prefixCls="drawer"
            placement={placement}
            open={visible}
            onClose={onClose}
            getContainer={customizeGetContainer || getContainer}
            rootClassName={cn(
                themeClassNames.color.primary,
                themeClassNames.control,
                themeClassNames.font,
                themeClassNames.shadow,
                themeClassNames.size,
                themeClassNames.space,
                styles.wrapper,
                { [styles.wrapper__NoMask]: !showMask },
            )}
            width={placement === 'left' || placement === 'right' ? (width ?? 400) : undefined}
            height={placement === 'top' || placement === 'bottom' ? (height ?? 400) : undefined}
            mask={showMask}
            maskMotion={{
                motionAppear: true,
                motionName: 'drawer-mask',
            }}
            motion={(p) => ({
                motionAppear: true,
                motionName: `drawer-panel-${p}`,
            })}
            afterOpenChange={(open) => {
                if (!open && resetScrollPositionOnClose) {
                    bodyRef.current?.scrollTo(0, 0)
                }
                afterVisibleChange?.(open)
            }}
            keyboard={keyboard}
            maskClosable={maskClosable}
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
}
