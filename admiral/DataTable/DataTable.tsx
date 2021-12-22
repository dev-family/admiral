import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { Card, Table } from '@/admiral/ui'
import { ColumnsType, TableProps } from '@/admiral/ui/Table/interfaces'
import { ControlledSorter } from '@/admiral/ui/Table/hooks/useSorter'
import { useUrlState } from '@/admiral/utils/hooks'

// TODO: pass table visual props
// TODO: rowSelection config

export type DataTableProps<RecordType> = {
    url: string
    columns: ColumnsType<RecordType>
    initialSorter?: ControlledSorter
}

const PAGE_DEFAULT = 1
const PAGE_SIZE_DEFAULT = 10

export function DataTable<RecordType>({ url, columns, initialSorter }: DataTableProps<RecordType>) {
    const [data, setData] = useState<RecordType[]>([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState()
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

    async function fetch(url: string, state: any) {
        setLoading(true)
        try {
            const response = await axios.get(url, { params: state })
            console.log('response: ', response)

            setData(response.data.data)
            setTotal(response.data.pagination.total)
        } catch (error) {}
        setLoading(false)
    }

    useEffect(() => {
        fetch(url, state)
    }, [url, state])

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

    return (
        <Card>
            <Table
                dataSource={data}
                columns={columns}
                sorter={sorter}
                scroll={{
                    x: 0,
                }}
                sticky
                pagination={{ current: +state.page, pageSize: +state.page_size, total }}
                loading={loading}
                onChange={onTableChange}
            />
        </Card>
    )
}
