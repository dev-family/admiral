import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Card, Table } from '../ui'
import { ColumnsType, TableProps } from '../ui/Table/interfaces'
import { ControlledSorter } from '../ui/Table/hooks/useSorter'
import { useUrlState } from '../utils/hooks'
import { useDataProvider } from '../dataProvider'
import { DataTableContextProvider } from './DataTableContext'
import { arrayMove } from '@dnd-kit/sortable'

// TODO: pass table visual props
// TODO: rowSelection config

export type DataTableProps<RecordType> = {
    resource: string
    columns: ColumnsType<RecordType>
    initialSorter?: ControlledSorter
    dndRows?: boolean
}

const PAGE_DEFAULT = 1
const PAGE_SIZE_DEFAULT = 10

export function DataTable<RecordType extends { id: number | string }>({
    resource,
    columns,
    initialSorter,
    dndRows = false,
}: DataTableProps<RecordType>) {
    const { getList, reorderList } = useDataProvider()
    const [data, setData] = useState<RecordType[]>([])

    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState<number>()
    const [state, setState] = useUrlState({
        page: '1',
        page_size: '10',
        sort: initialSorter ? { [initialSorter.columnKey]: initialSorter.order } : {},
    })

    const sorter = useMemo(() => {
        const entries = Object.entries(state.sort)
        return entries.length > 0
            ? ({
                  columnKey: entries[0][0],
                  order: entries[0][1],
              } as ControlledSorter)
            : null
    }, [state])

    async function fetch(resource: string, state: any) {
        setLoading(true)
        try {
            const response = await getList(resource, {
                pagination: { perPage: state.page_size, page: state.page },
                sort: state.sort,
            })

            setData(response.items as any)
            setTotal(response.meta.total)
        } catch (error) {}
        setLoading(false)
    }

    async function reorder(
        resource: string,
        state: any,
        ids: Array<string | number>,
        replaces: string[],
    ) {
        await reorderList(resource, {
            data: {
                pagination: {
                    perPage: state.page_size,
                    page: state.page,
                },
                ids,
                replaces,
            },
        })
    }

    const refresh = useCallback(() => {
        fetch(resource, state)
    }, [resource, state, fetch])

    useEffect(() => {
        fetch(resource, state)
    }, [resource, state])

    const onTableChange: TableProps<RecordType>['onChange'] = (pagination, sorter, extra) => {
        if (extra.action === 'paginate') {
            const { current, pageSize } = pagination
            setState({
                page: current !== PAGE_DEFAULT ? current : undefined,
                page_size: pageSize !== PAGE_SIZE_DEFAULT ? pageSize : undefined,
            })
        }
        if (extra.action === 'sort') {
            const { columnKey, order } = sorter
            setState(columnKey && order ? { sort: { [columnKey]: order } } : { sort: undefined })
        }
    }

    const scrollX = useMemo(() => {
        return columns.reduce((acc, column) => {
            const width = Number(column.width)
            return isNaN(width) ? acc + 200 : acc + width
        }, 0)
    }, [columns])

    const onDragEnd: TableProps<RecordType>['onDragEnd'] = useCallback(
        ({ active, over }) => {
            const prevId = active?.id
            const nextId = over?.id
            let prevData = data
            const getIndex = (id: number | string) => data.findIndex((item) => item.id == id)
            if (prevId && nextId && prevId != nextId) {
                const prevIdx = getIndex(prevId)
                const nextIdx = getIndex(nextId)
                const nextData = arrayMove(data, prevIdx, nextIdx)

                setData(nextData)
                reorder(
                    resource,
                    state,
                    nextData.map((i) => i.id),
                    [prevId, nextId],
                ).catch(() => setData(prevData))
            }
        },
        [data, state, reorder, resource],
    )

    return (
        <Card>
            <DataTableContextProvider value={{ refresh }}>
                <Table
                    dataSource={data}
                    rowKey="id"
                    columns={columns}
                    sorter={sorter}
                    scroll={{
                        x: scrollX,
                    }}
                    sticky
                    pagination={{
                        current: +state.page,
                        pageSize: +state.page_size,
                        total,
                        showTotal: (total) => `Всего ${total}`,
                        showSizeChanger: !!total && total > 10,
                    }}
                    loading={loading}
                    onChange={onTableChange}
                    dndRows={dndRows}
                    onDragEnd={onDragEnd}
                />
            </DataTableContextProvider>
        </Card>
    )
}
