import React, { useRef, useState, useCallback, cloneElement } from 'react'
import { createPortal } from 'react-dom'
import {
    useFloating,
    useHover,
    useFocus,
    useDismiss,
    useRole,
    useClick,
    useInteractions,
    useTransitionStyles,
    FloatingArrow,
    offset,
    flip,
    shift,
    arrow,
    autoUpdate,
    safePolygon,
} from '@floating-ui/react'
import cn from 'classnames'
import { useTheme } from '../../theme'
import styles from './Tooltip.module.scss'
import type { TooltipProps } from './interfaces'

export const Tooltip = ({
    content,
    children,
    placement = 'top',
    offset: offsetProp = 10,
    trigger = 'hover',
    interactive = false,
    disabled = false,
    hideOnClick,
    open: controlledOpen,
    onOpenChange,
    arrow: showArrow = false,
    mode,
    invertTheme = false,
    contentClassName,
    root: customRoot,
}: TooltipProps) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
    const isControlled = controlledOpen !== undefined
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen
    const setOpen = isControlled ? (onOpenChange ?? (() => {})) : setUncontrolledOpen

    const arrowRef = useRef<SVGSVGElement>(null)
    const { themeClassNames } = useTheme()

    const offsetValue = Array.isArray(offsetProp)
        ? { mainAxis: offsetProp[1], crossAxis: offsetProp[0] }
        : offsetProp

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen && !disabled,
        onOpenChange: setOpen,
        placement,
        strategy: 'fixed',
        middleware: [
            offset(offsetValue),
            flip(),
            shift({ padding: 5 }),
            ...(showArrow ? [arrow({ element: arrowRef })] : []),
        ],
        whileElementsMounted: autoUpdate,
    })

    const hoverInteraction = useHover(context, {
        enabled: trigger === 'hover' && !disabled,
        handleClose: interactive ? safePolygon() : undefined,
    })
    const clickInteraction = useClick(context, {
        enabled: trigger === 'click' && !disabled,
    })
    const focusInteraction = useFocus(context, {
        enabled: trigger === 'hover' && !disabled,
    })
    const dismissInteraction = useDismiss(context)
    const roleInteraction = useRole(context, { role: 'tooltip' })

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hoverInteraction,
        clickInteraction,
        focusInteraction,
        dismissInteraction,
        roleInteraction,
    ])

    const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
        duration: 160,
        initial: { opacity: 0, transform: 'scale(0.85)' },
    })

    // Merge child ref with floating-ui reference ref
    const setRef = useCallback(
        (node: HTMLElement | null) => {
            refs.setReference(node)
            // Forward ref to original child if it has one
            // In React 19, ref is accessed via (children as any).ref, not children.props.ref
            const childRef = (children as any).ref
            if (typeof childRef === 'function') childRef(node)
            else if (childRef && typeof childRef === 'object') childRef.current = node
        },
        [refs.setReference, children],
    )

    const childProps = children.props as Record<string, any>
    const referenceProps = getReferenceProps({
        ...childProps,
        ...(hideOnClick === false && trigger === 'hover'
            ? {
                  onClick: (e: React.MouseEvent) => {
                      childProps?.onClick?.(e)
                  },
              }
            : {}),
    })

    // Portal target
    const getPortalTarget = (): HTMLElement => {
        if (typeof customRoot === 'function') return customRoot() || document.body
        if (customRoot) return customRoot
        return (document.querySelector('#root > .Theme') as HTMLElement) || document.body
    }

    const floatingNode = (
        <div
            ref={refs.setFloating}
            style={{
                ...floatingStyles,
                ...transitionStyles,
                transform:
                    [floatingStyles.transform, transitionStyles.transform]
                        .filter(Boolean)
                        .join(' ') || undefined,
                zIndex: 9999,
            }}
            {...getFloatingProps()}
            className={cn(
                styles.tooltip,
                themeClassNames.color.primary,
                themeClassNames.control,
                themeClassNames.font,
                themeClassNames.size,
                themeClassNames.space,
                themeClassNames.shadow,
                {
                    [themeClassNames.color.invert]: invertTheme,
                    [styles.tooltip__Custom]: mode === 'custom',
                },
                contentClassName,
            )}
        >
            {content}
            {showArrow && (
                <FloatingArrow ref={arrowRef} context={context} className={styles.arrow} />
            )}
        </div>
    )

    return (
        <>
            {cloneElement(children, { ...referenceProps, ref: setRef } as any)}
            {isMounted && createPortal(floatingNode, getPortalTarget())}
        </>
    )
}
