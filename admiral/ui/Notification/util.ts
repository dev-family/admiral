import type * as React from 'react'
import type { CSSMotionProps } from 'rc-motion'
import { NotificationPlacement } from './interfaces'

export function getPlacementStyle(placement: NotificationPlacement, top: number, bottom: number) {
    let style: React.CSSProperties

    switch (placement) {
        case 'top':
            style = {
                left: '50%',
                transform: 'translateX(-50%)',
                right: 'auto',
                top,
                bottom: 'auto',
            }
            break

        case 'topLeft':
            style = {
                left: 0,
                top,
                bottom: 'auto',
            }
            break

        case 'topRight':
            style = {
                right: 0,
                top,
                bottom: 'auto',
            }
            break

        case 'bottom':
            style = {
                left: '50%',
                transform: 'translateX(-50%)',
                right: 'auto',
                top: 'auto',
                bottom,
            }
            break

        case 'bottomLeft':
            style = {
                left: 0,
                top: 'auto',
                bottom,
            }
            break

        default:
            style = {
                right: 0,
                top: 'auto',
                bottom,
            }
            break
    }
    return style
}

export function getMotion(prefixCls: string): CSSMotionProps {
    return {
        motionName: `${prefixCls}-fade`,
        motionAppear: true,
        motionEnter: true,
        motionLeave: true,
        // This handler makes rc-motion inject `transition: none` inline during STEP_START so the
        // browser commits the invisible initial state before STEP_ACTIVE fires the CSS transition.
        // NB: CSSMotionList does not forward onEnterPrepare (it is absent from its
        // MOTION_PROP_NAMES) — passing it would leak the prop onto the DOM node.
        onAppearPrepare: () => {},
        onLeaveStart: (ele) => {
            const { offsetHeight } = ele
            return { height: offsetHeight }
        },
        onLeaveActive: () => ({ height: 0, opacity: 0, margin: 0 }),
    }
}
