import React from 'react'
import { MdDragIndicator } from 'react-icons/md'
import { Button } from '../Button'

export function DragHandle({ listeners }: { listeners?: Record<string, unknown> }) {
    return (
        <Button
            type="button"
            size="S"
            view="clear"
            // dnd-kit listeners live on the button itself, not on the icon:
            // KeyboardSensor activates from keydown on the focused element, and
            // a keydown on the button never bubbles through the icon's handlers.
            style={
                {
                    '--button-bg-focus': 'rgba(0,0,0,0)',
                    cursor: 'grab',
                    touchAction: 'none',
                } as React.CSSProperties
            }
            iconLeft={<MdDragIndicator />}
            {...listeners}
        />
    )
}
