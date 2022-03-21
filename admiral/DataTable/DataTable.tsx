import React, { useState, useEffect, useMemo } from 'react'
import { Card, Table } from '@/admiral/ui'
import { ColumnsType, TableProps } from '@/admiral/ui/Table/interfaces'
import { ControlledSorter } from '@/admiral/ui/Table/hooks/useSorter'
import { useUrlState } from '@/admiral/utils/hooks'
import { useDataProvider } from '@/admiral/dataProvider'

// TODO: pass table visual props
// TODO: rowSelection config

export type DataTableProps<RecordType> = {
    resource: string
    columns: ColumnsType<RecordType>
    initialSorter?: ControlledSorter
}

const PAGE_DEFAULT = 1
const PAGE_SIZE_DEFAULT = 10

export function DataTable<RecordType>({
    resource,
    columns,
    initialSorter,
}: DataTableProps<RecordType>) {
    const { getList } = useDataProvider()
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

    return (
        <Card>
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
                }}
                loading={loading}
                onChange={onTableChange}
            />
        </Card>
    )
}
