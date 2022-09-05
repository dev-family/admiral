import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Table } from '../ui'
import { ColumnsType, TableLocale, TableProps, Key } from '../ui/Table/interfaces'
import { PaginationLocale } from '../ui/Pagination/interfaces'
import { ControlledSorter } from '../ui/Table/hooks/useSorter'
import { useDataProvider } from '../dataProvider'
import { DataTableContextProvider } from './DataTableContext'
import { arrayMove } from '@dnd-kit/sortable'
import { useCrudIndex } from '../crud/CrudIndexPageContext'
import { useTopLocation } from '../router'

export type DataTableProps<RecordType> = {
    resource: string
    columns: ColumnsType<RecordType>
    initialSorter?: ControlledSorter
    locale?: Partial<{
        table: TableLocale
        pagination: PaginationLocale & { total: (total: number) => string }
    }>
    config?: DataTableConfig<RecordType>
}

export interface DataTableConfig<RecordType>
    extends Pick<
        TableProps<RecordType>,
        'dndRows' | 'showSorterTooltip' | 'bordered' | 'size' | 'title' | 'footer'
    > {
    rowSelection?: DataTableRowSelectionConfig<RecordType>
}

export type DataTableRowSelectionConfig<RecordType> = {
    render: (selectedRowKeys: Key[], selectedRows: RecordType[]) => React.ReactNode
    onSelectionChange?: (selectedRowKeys: Key[], selectedRows: RecordType[]) => void
}

export function DataTable<RecordType extends { id: number | string }>({
    resource,
    columns,
    locale,
    config,
}: DataTableProps<RecordType>) {
    const { getList, reorderList } = useDataProvider()
    const [data, setData] = useState<RecordType[]>([])

    const { rowSelection, title, ...tableConfig } = config || {}

    const [selectedKeys, setSelectedKeys] = useState<Key[]>([])
    const [selectedRows, setSelectedRows] = useState<RecordType[]>([])

    const onSelectionChange = useCallback(
        (selectedRowKeys: Key[], selectedRows: RecordType[]) => {
            setSelectedKeys(selectedRowKeys)
            setSelectedRows(selectedRows)
            if (rowSelection) {
                rowSelection.onSelectionChange?.(selectedRowKeys, selectedRows)
            }
        },
        [rowSelection],
    )

    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState<number>()
    const { urlState, setUrlState } = useCrudIndex()
    const shouldUpdate = useShouldUpdate()

    const sorter = useMemo(() => {
        const entries = Object.entries(urlState.sort)
        return entries.length > 0
            ? ({
                  columnKey: entries[0][0],
                  order: entries[0][1],
              } as ControlledSorter)
            : null
    }, [urlState])

    async function fetch(resource: string, state: typeof urlState) {
        setLoading(true)
        try {
            const [sortField, sortOrder] = Object.entries(state.sort)[0] || []

            const response = await getList(resource, {
                pagination: { perPage: +state.page_size, page: +state.page },
                filter: state.filter,
                ...(sortField && sortOrder && { sort: { field: sortField, order: sortOrder } }),
            })

            setData(response.items as any)
            setTotal(response.meta.total)
        } catch (error) {}
        setLoading(false)
    }

    async function reorder(
        resource: string,
        state: typeof urlState,
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
        fetch(resource, urlState)
    }, [resource, urlState, fetch])

    useEffect(() => {
        fetch(resource, urlState)
    }, [resource, urlState])

    useEffect(() => {
        if (shouldUpdate) {
            refresh()
        }
    }, [shouldUpdate])

    const onTableChange: TableProps<RecordType>['onChange'] = (pagination, sorter, extra) => {
        if (extra.action === 'paginate') {
            const { current, pageSize } = pagination
            setUrlState({
                page: current ? String(current) : undefined,
                page_size: pageSize ? String(pageSize) : undefined,
            })
        }
        if (extra.action === 'sort') {
            const { columnKey, order } = sorter
            const sort = columnKey && order ? { sort: { [columnKey]: order } } : { sort: {} }
            setUrlState((prev) => ({ ...prev, sort }))
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
                    urlState,
                    nextData.map((i) => i.id),
                    [prevId, nextId],
                ).catch(() => setData(prevData))
            }
        },
        [data, urlState, reorder, resource],
    )

    const rowSelectionAndTitleConfig = useMemo(() => {
        const config: {
            title?: TableProps<RecordType>['title']
            rowSelection?: TableProps<RecordType>['rowSelection']
        } = {}
        const hasRowSelectionConfig = typeof rowSelection === 'object'
        const hasTitle = !!title

        if (hasRowSelectionConfig) {
            config.rowSelection = { selectedRowKeys: selectedKeys, onChange: onSelectionChange }
            config.title = (data) => {
                const customTitle = title?.(data)
                const rowSelectionNode = hasRowSelectionConfig
                    ? rowSelection.render(selectedKeys, selectedRows)
                    : null

                return (
                    <>
                        {customTitle}
                        {rowSelectionNode}
                    </>
                )
            }
        } else if (hasTitle) {
            config.title = title
        }

        return config
    }, [rowSelection, title, selectedKeys, selectedRows, onSelectionChange])

    const {
        total: paginationShowTotal = (total: number) => `Total ${total}`,
        ...paginationLocale
    } = locale?.pagination ?? {}

    return (
        <DataTableContextProvider value={{ refresh }}>
            <Table
                {...tableConfig}
                {...rowSelectionAndTitleConfig}
                dataSource={data}
                rowKey="id"
                columns={columns}
                sorter={sorter}
                scroll={{
                    x: scrollX,
                }}
                sticky
                pagination={{
                    current: +urlState.page,
                    pageSize: +urlState.page_size,
                    total,
                    showTotal: paginationShowTotal,
                    showSizeChanger: !!total && total > 10,
                    locale: paginationLocale,
                }}
                loading={loading}
                onChange={onTableChange}
                onDragEnd={onDragEnd}
                locale={locale?.table}
            />
        </DataTableContextProvider>
    )
}

const useShouldUpdate = () => {
    const location = useTopLocation().state
    const shouldUpdate = useMemo(() => location?.update?.dataTable ?? false, [location])

    return shouldUpdate
}
