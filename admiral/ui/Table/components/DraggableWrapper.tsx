import React from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export function DraggableWrapper(props: any) {
    const { children, ...restProps } = props
    /**
     * 'children[1]` is `dataSource`
     * Check if `children[1]` is an array
     * because rc-table gives 'No Data' element when `dataSource` is an empty array
     */

    return (
        <SortableContext
            items={children[1] instanceof Array ? children[1].map((child: any) => child.key) : []}
            strategy={verticalListSortingStrategy}
        >
            <tbody {...restProps}>
                {
                    // This invokes `Table.components.body.row` for each element of `children`.
                    children
                }
            </tbody>
        </SortableContext>
    )
}
