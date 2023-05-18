import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'
import { Button, Table } from '../ui'
import { ColumnsType, TableLocale, TableProps, Key } from '../ui/Table/interfaces'
import { PaginationLocale } from '../ui/Pagination/interfaces'
import { ControlledSorter } from '../ui/Table/hooks/useSorter'
import { useDataProvider } from '../dataProvider'
import { DataTableContextProvider } from './DataTableContext'
import { arrayMove } from '@dnd-kit/sortable'
import { useCrudIndex } from '../crud/CrudIndexPageContext'
import { useTopLocation } from '../router'
import styles from './DataTable.module.scss'

export type DataTableProps<RecordType> = {
    resource: string
    columns: ColumnsType<RecordType>
    initialSorter?: ControlledSorter
    locale?: Partial<{
        table: TableLocale
        pagination: PaginationLocale & { total: (total: number) => string }
    }>
    config?: DataTableConfig<RecordType>
    autoupdateTime?: number
}

export interface DataTableConfig<RecordType>
    extends Pick<
        TableProps<RecordType>,
        'dndRows' | 'showSorterTooltip' | 'bordered' | 'size' | 'title' | 'footer'
    > {
    rowSelection?: DataTableRowSelectionConfig<RecordType>
    autoupdateTime?: number
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
    autoupdateTime,
}: DataTableProps<RecordType>) {
    const { getList, reorderList } = useDataProvider()
    const [data, setData] = useState<RecordType[]>([])
    const [isAutoupdateTurnOn, setIsAutoupdateTurnOn] = useState<boolean>(!!config?.autoupdateTime)

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

    const isFetching = useRef(false)
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState<number>()
    const { urlState, setUrlState } = useCrudIndex()
    const shouldUpdate = useShouldUpdate()

    const toggleTableAutoupdate = () => {
        setIsAutoupdateTurnOn((prev) => !prev)
    }

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
        if (isFetching.current) {
            return
        }
        // useState does not have time to update if we call fetch several times at the same time
        isFetching.current = true
        setLoading(true)
        try {
            const [sortField, sortOrder] = Object.entries(state.sort)[0] || []
            const response = await getList(resource, {
                pagination: { perPage: +state.page_size, page: +state.page },
                ...(sortField && sortOrder && { sort: { field: sortField, order: sortOrder } }),
                filter: state.filter,
                search: state.search,
            })

            setData(response.items as any)
            setTotal(response.meta.total)
        } catch (error) {}
        isFetching.current = false
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

    const timerRef = useRef<NodeJS.Timeout | undefined>()

    const clearTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
    }

    const fetchData = useCallback(async () => {
        await fetch(resource, urlState)
        clearTimer()

        timerRef.current = setTimeout(fetchData, autoupdateTime)
    }, [resource, urlState, autoupdateTime])

    useEffect(() => {
        if (autoupdateTime && isAutoupdateTurnOn) {
            fetchData()
        }

        return () => {
            clearTimer()
        }
    }, [isAutoupdateTurnOn, fetchData])

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
        const configuration: {
            title?: TableProps<RecordType>['title']
            rowSelection?: TableProps<RecordType>['rowSelection']
        } = {}
        const hasRowSelectionConfig = typeof rowSelection === 'object'
        const hasTitle = !!title
        const hasTableAutoupdate = !!config?.autoupdateTime
        const AutoupdateIcon = hasTableAutoupdate ? (isAutoupdateTurnOn ? FaPause : FaPlay) : null

        if (hasRowSelectionConfig || hasTableAutoupdate) {
            configuration.rowSelection = {
                selectedRowKeys: selectedKeys,
                onChange: onSelectionChange,
            }
            configuration.title = (data) => {
                const customTitle = title?.(data)
                const rowSelectionNode = hasRowSelectionConfig
                    ? rowSelection.render(selectedKeys, selectedRows)
                    : null

                return (
                    <header className={styles.table__header}>
                        <div>
                            {customTitle}
                            {rowSelectionNode ? rowSelectionNode : <></>}
                        </div>
                        {AutoupdateIcon ? (
                            <div className={styles.table__header_autoupdate}>
                                <p>Autorefresh</p>
                                <Button
                                    onClick={toggleTableAutoupdate}
                                    view="clear"
                                    size="S"
                                    iconRight={<AutoupdateIcon />}
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                    </header>
                )
            }
        } else if (hasTitle) {
            configuration.title = title
        }

        return configuration
    }, [rowSelection, title, selectedKeys, selectedRows, onSelectionChange, isAutoupdateTurnOn])

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
                pagination={
                    !!total &&
                    total > +urlState.page_size && {
                        current: +urlState.page,
                        pageSize: +urlState.page_size,
                        total,
                        showTotal: paginationShowTotal,
                        showSizeChanger: !!total && total > 10,
                        locale: paginationLocale,
                    }
                }
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
