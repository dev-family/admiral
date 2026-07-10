import React, { useState, useEffect, useMemo, useCallback } from 'react'
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
import { useLatest, useLatestRequest, useUpdateEffect } from '../utils/hooks'
import styles from './DataTable.module.scss'

export type DataTableProps<RecordType> = {
    resource: string
    columns: ColumnsType<RecordType>
    locale?: Partial<{
        table: TableLocale
        pagination: PaginationLocale & { total: (total: number) => string }
    }>
    config?: DataTableConfig<RecordType>
    autoupdateTime?: number
}

export interface DataTableConfig<RecordType> extends Pick<
    TableProps<RecordType>,
    'dndRows' | 'showSorterTooltip' | 'bordered' | 'size' | 'title' | 'footer'
> {
    rowSelection?: DataTableRowSelectionConfig<RecordType>
    autoupdateTime?: number
}

export type DataTableRowSelectionConfig<RecordType> = {
    render: ({
        selectedRowKeys,
        selectedRows,
        refresh,
    }: {
        selectedRowKeys: Key[]
        selectedRows: RecordType[]
        refresh: () => void
    }) => React.ReactNode
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
    const autoupdateInterval = config?.autoupdateTime ?? autoupdateTime
    const [isAutoupdateTurnOn, setIsAutoupdateTurnOn] = useState<boolean>(!!autoupdateInterval)

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

    const toggleTableAutoupdate = useCallback(() => {
        setIsAutoupdateTurnOn((prev) => !prev)
    }, [])

    const sorter = useMemo(() => {
        const entries = Object.entries(urlState.sort)
        return entries.length > 0
            ? ({
                  columnKey: entries[0][0],
                  order: entries[0][1],
              } as ControlledSorter)
            : null
    }, [urlState])

    // Out-of-order responses must not overwrite newer ones.
    const beginRequest = useLatestRequest()

    const fetch = useCallback(
        async (resource: string, state: typeof urlState) => {
            const isCurrent = beginRequest()
            setLoading(true)
            try {
                const [sortField, sortOrder] = Object.entries(state.sort)[0] || []
                const response = await getList(resource, {
                    pagination: {
                        perPage: Number(state.page_size) || 10,
                        page: Number(state.page) || 1,
                    },
                    ...(sortField && sortOrder && { sort: { field: sortField, order: sortOrder } }),
                    filter: state.filter,
                })

                if (isCurrent()) {
                    setData(response.items as RecordType[])
                    setTotal(response.meta.total)
                }
            } catch (error) {
                console.error(`[Admiral] Failed to fetch "${resource}":`, error)
            } finally {
                if (isCurrent()) {
                    setLoading(false)
                }
            }
        },
        [getList, beginRequest],
    )

    const reorder = useCallback(
        async (
            resource: string,
            state: typeof urlState,
            ids: Array<string | number>,
            replaces: string[],
        ) => {
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
        },
        [reorderList],
    )

    // Stable identity so context consumers (row actions, bulk actions) always
    // refetch with the current url state, not the one captured at their mount.
    const refreshRef = useLatest(() => {
        fetch(resource, urlState)
    })
    const refresh = useCallback(() => refreshRef.current(), [refreshRef])

    useEffect(() => {
        fetch(resource, urlState)
    }, [resource, urlState, fetch])

    useUpdateEffect(() => {
        if (shouldUpdate) {
            refresh()
        }
    }, [shouldUpdate, refresh])

    useEffect(() => {
        if (!autoupdateInterval || !isAutoupdateTurnOn) {
            return
        }
        let cancelled = false
        let timer: ReturnType<typeof setTimeout>
        const tick = async () => {
            await fetch(resource, urlState)
            if (!cancelled) {
                timer = setTimeout(tick, autoupdateInterval)
            }
        }
        timer = setTimeout(tick, autoupdateInterval)
        return () => {
            cancelled = true
            clearTimeout(timer)
        }
    }, [isAutoupdateTurnOn, autoupdateInterval, resource, urlState, fetch])

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
            const sort = columnKey && order ? { [String(columnKey)]: order } : {}
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
        ({ active, over }: { active: any; over: any }) => {
            const prevId = active?.id
            const nextId = over?.id
            const prevData = data
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

    const autoRefreshLabel = locale?.table?.autoRefreshButton

    const rowSelectionAndTitleConfig = useMemo(() => {
        const configuration: {
            title?: TableProps<RecordType>['title']
            rowSelection?: TableProps<RecordType>['rowSelection']
        } = {}
        const hasRowSelectionConfig = typeof rowSelection === 'object'
        const hasTitle = !!title
        const hasTableAutoupdate = !!autoupdateInterval
        const AutoupdateIcon = hasTableAutoupdate ? (isAutoupdateTurnOn ? FaPause : FaPlay) : null

        if (hasRowSelectionConfig || hasTableAutoupdate) {
            configuration.rowSelection = hasRowSelectionConfig
                ? {
                      selectedRowKeys: selectedKeys,
                      onChange: onSelectionChange,
                  }
                : undefined
            configuration.title = (data) => {
                const customTitle = title?.(data)
                const rowSelectionNode = hasRowSelectionConfig
                    ? rowSelection.render({ selectedRowKeys: selectedKeys, selectedRows, refresh })
                    : null

                return (
                    <header className={styles.table__header}>
                        <div>
                            {customTitle}
                            {rowSelectionNode ? rowSelectionNode : <></>}
                        </div>
                        {AutoupdateIcon ? (
                            <div className={styles.table__header_autoupdate}>
                                <p>{autoRefreshLabel}</p>
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
    }, [
        rowSelection,
        title,
        selectedKeys,
        selectedRows,
        onSelectionChange,
        isAutoupdateTurnOn,
        autoupdateInterval,
        autoRefreshLabel,
        refresh,
        toggleTableAutoupdate,
    ])

    const {
        total: paginationShowTotal = (total: number) => `Total ${total}`,
        ...paginationLocale
    } = locale?.pagination ?? {}

    const dataTableContextValue = useMemo(() => ({ refresh }), [refresh])

    return (
        <DataTableContextProvider value={dataTableContextValue}>
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
                    total > (Number(urlState.page_size) || 10) && {
                        current: Number(urlState.page) || 1,
                        pageSize: Number(urlState.page_size) || 10,
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
