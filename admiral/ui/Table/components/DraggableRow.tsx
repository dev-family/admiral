import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { DragHandle } from './DragHandle'

export function DraggableRow(props: any) {
    const id = props['data-row-key']?.toString()
    const { children, ...restProps } = props

    const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
        id,
    })
    /**
     * 'children[1]` is a row of `dataSource`
     * Check if `children[1]` is an array
     * because rc-table gives 'No Data' element when `dataSource` is an empty array
     */

    return (
        <tr
            ref={setNodeRef}
            {...attributes}
            {...restProps}
            style={
                {
                    transition: [transition].filter(Boolean).join(', '),
                    '--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
                    '--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
                    '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
                    '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
                    ...(isDragging && { zIndex: 999 }),
                } as React.CSSProperties
            }
        >
            {Array.isArray(children)
                ? children.map((child: any) => {
                      const { key } = child

                      return key === 'dragHandle'
                          ? React.cloneElement(child, {
                                render: () => <DragHandle listeners={listeners} />,
                            })
                          : child
                  })
                : children}
        </tr>
    )
}
