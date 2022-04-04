import React from 'react'
import { MdDragIndicator } from 'react-icons/md'
import { Button } from '../../Button'

export function DragHandle({ listeners }: { listeners?: any }) {
    return (
        <Button
            type="button"
            size="S"
            view="clear"
            style={{ '--button-bg-focus': 'rgba(0,0,0,0)' } as any}
            iconLeft={
                <MdDragIndicator
                    style={{
                        cursor: 'grab',
                        touchAction: 'none',
                    }}
                    {...listeners}
                />
            }
        />
    )
}
