import React, { forwardRef, useMemo, useState, useCallback, useRef } from 'react'
import RcTable from 'rc-table'
import cn from 'classnames'
import { convertChildrenToColumns } from 'rc-table/lib/hooks/useColumns'
import {
    ColumnsType,
    ColumnType,
    TableProps,
    ChangeEventInfo,
    TableAction,
    GetRowKey,
    TableLocale,
} from './interfaces'

import { enUs } from './locales/'
import useSorter, { SorterResult, getSortData } from './hooks/useSorter'
import usePagination, { getPaginationParam, DEFAULT_PAGE_SIZE } from './hooks/usePagination'
import useSelection from './hooks/useSelection'
import useLazyKVMap from './hooks/useLazyKVMap'
import { Pagination } from '../Pagination'
import { Spin } from '../Spin'
import { SpinProps } from '../Spin/interfaces'
import styles from './Table.module.scss'
import { IoFileTrayOutline } from 'react-icons/io5'
import {
    closestCenter,
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
} from '@dnd-kit/core'
import { DraggableRow, DraggableWrapper, DragHandle } from './components'
import mergeRefs from 'react-merge-refs'
import useTableSize from './hooks/useTableSize'

// TODO: sorter tooltip
// TODO: table locale
// TODO: docs: sortDirections/sorter (Table props), sortDirections/defaultSortOrder/sorter (Column props)
// TODO: docs: rowSelection properties
// TODO: disable d&d if other sort choosen

const defaultLocale = enUs

const EMPTY_LIST: any[] = []

function Column<RecordType>(_: ColumnType<RecordType>) {
    return null
}

function InternalTable<RecordType extends object = any>(
    props: TableProps<RecordType>,
    wrapperRef: React.ForwardedRef<HTMLDivElement>,
) {
    const {
        className: wrapperClassName,
        style,
        dataSource,
        columns,
        size = 'large',
        bordered = false,
        sortDirections,
        sorter,
        pagination,
        onChange,
        rowKey = 'key',
        rowSelection,
        loading,
        dndRows = false,
        onDragEnd,
        children,
        locale,
        showSorterTooltip = true,
        ...tableProps
    } = props

    const data: readonly RecordType[] = dataSource || EMPTY_LIST
    const tableLocale = { ...defaultLocale, ...locale } as TableLocale
    // ============================ RowKey ============================
    const getRowKey = useMemo<GetRowKey<RecordType>>(() => {
        if (typeof rowKey === 'function') {
            return rowKey
        }

        return (record: RecordType) => (record as any)?.[rowKey as string]
    }, [rowKey])

    const [getRecordByKey] = useLazyKVMap(data, getRowKey)

    // =========================== Spinning ===========================
    let spinProps: SpinProps | undefined
    if (typeof loading === 'boolean') {
        spinProps = {
            spinning: loading,
        }
    } else if (typeof loading === 'object') {
        spinProps = {
            spinning: true,
            ...loading,
        }
    }

    // To merge columns used as children (<Table.Column />)
    const mergedColumns = useMemo(() => {
        return columns || (convertChildrenToColumns(children) as ColumnsType<RecordType>)
    }, [children, columns])

    const changeEventInfo: Partial<ChangeEventInfo<RecordType>> = {}

    const _onChange = (info: Partial<ChangeEventInfo<RecordType>>, action: TableAction) => {
        const changeInfo = {
            ...changeEventInfo,
            ...info,
        }

        if (onChange) {
            onChange(changeInfo.pagination!, changeInfo.sorter!, { action })
        }
    }

    const onSorterChange = (sorter: SorterResult<RecordType>) => {
        _onChange(
            {
                sorter,
            },
            'sort',
        )
    }

    const [transformedColumns, sortState, getSorters] = useSorter<RecordType>({
        mergedColumns,
        onSorterChange,
        sortDirections: sortDirections || ['asc', 'desc'],
        controlledSorter: sorter,
        tableLocale,
        showSorterTooltip,
    })
    changeEventInfo.sorter = getSorters()
    const sortedData = React.useMemo(() => getSortData(data, sortState), [data, sortState])

    // ========================== Pagination ==========================
    const onPaginationChange = (current: number, pageSize: number) => {
        _onChange({ pagination: { ...changeEventInfo.pagination, current, pageSize } }, 'paginate')
    }
    const [mergedPagination, resetPagination] = usePagination(
        sortedData.length,
        pagination,
        onPaginationChange,
    )

    changeEventInfo.pagination = getPaginationParam(mergedPagination)
    changeEventInfo.resetPagination = resetPagination

    // ============================= Data =============================
    const pageData = React.useMemo<RecordType[]>(() => {
        if (pagination === false || !mergedPagination.pageSize) {
            return sortedData
        }

        const { current = 1, total, pageSize = DEFAULT_PAGE_SIZE } = mergedPagination

        // Dynamic table data
        if (sortedData.length < total!) {
            if (sortedData.length > pageSize) {
                return sortedData.slice((current - 1) * pageSize, current * pageSize)
            }
            return sortedData
        }

        return sortedData.slice((current - 1) * pageSize, current * pageSize)
    }, [!!pagination, sortedData, mergedPagination])

    // ========================== Selections ==========================
    const [transformSelectionColumns, selectedKeySet] = useSelection<RecordType>(rowSelection, {
        prefixCls: 'admiral-table',
        locale: tableLocale,
        pageData,
        getRowKey,
        getRecordByKey,
    })
    const transformedSelectionColumns = transformSelectionColumns(transformedColumns)

    // ======================= Render Pagination ======================
    let topPaginationNode: React.ReactNode
    let bottomPaginationNode: React.ReactNode
    if (pagination !== false && mergedPagination?.total) {
        const renderPagination = (position: string, small?: boolean) => (
            <div
                className={cn(styles.pagination, {
                    [styles.pagination__PosLeft]: position === 'left',
                    [styles.pagination__PosCenter]: position === 'center',
                    [styles.pagination__SizeSmall]: small,
                })}
            >
                <Pagination {...mergedPagination} />
            </div>
        )
        const defaultPosition = 'right'
        const { position, size } = mergedPagination
        const isSmall = size === 'small'
        if (Array.isArray(position)) {
            const topPos = position.find((p) => p.indexOf('top') !== -1)
            const bottomPos = position.find((p) => p.indexOf('bottom') !== -1)
            if (!topPos && !bottomPos) {
                bottomPaginationNode = renderPagination(defaultPosition, isSmall)
            }
            if (topPos) {
                topPaginationNode = renderPagination(
                    topPos!.toLowerCase().replace('top', ''),
                    isSmall,
                )
            }
            if (bottomPos) {
                bottomPaginationNode = renderPagination(
                    bottomPos!.toLowerCase().replace('bottom', ''),
                    isSmall,
                )
            }
        } else {
            bottomPaginationNode = renderPagination(defaultPosition, isSmall)
        }
    }

    // ======================= Drag & Drop ======================
    const [activeId, setActiveId] = useState<string | null>(null)
    const handleDragStart = useCallback((event: DragStartEvent) => {
        const { active } = event
        setActiveId(active.id)
    }, [])

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            setActiveId(null)
            onDragEnd?.(event)
        },
        [onDragEnd],
    )

    const transformedDnDColumns = useMemo(
        () =>
            dndRows
                ? [
                      {
                          key: 'dragHandle',
                          dataIndex: 'dragHandle',
                          width: size === 'large' ? 64 : 48,
                          render: () => <DragHandle />,
                      },
                      ...transformedSelectionColumns,
                  ]
                : transformedSelectionColumns,
        [transformedSelectionColumns],
    )

    const sensors = useSensors(useSensor(PointerSensor))

    const innerWrapperRef = useRef<HTMLDivElement>()
    const overlayStyle = useTableSize(innerWrapperRef)

    const dragOverlayData = useMemo(() => {
        if (!dndRows) return []
        return pageData.filter((item: any) => getRowKey(item) == activeId)
    }, [dndRows, pageData, activeId])

    const tableWrapperClassName = cn(styles.wrapper, wrapperClassName, {
        [styles.wrapper__SizeMiddle]: size === 'middle',
        [styles.wrapper__SizeSmall]: size === 'small',
        [styles.wrapper__Bordered]: bordered,
        [styles.wrapper__WithTitle]: !!tableProps.title,
        [styles.wrapper__WithFooter]: !!tableProps.footer,
    })

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
            <div
                ref={mergeRefs([wrapperRef, innerWrapperRef])}
                className={tableWrapperClassName}
                style={style}
            >
                <Spin spinning={false} {...spinProps}>
                    {topPaginationNode}

                    <RcTable<RecordType>
                        {...tableProps}
                        prefixCls="admiral-table"
                        columns={transformedDnDColumns}
                        data={pageData}
                        rowKey={getRowKey}
                        emptyText={<NoData emptyText={tableLocale?.emptyText} />}
                        {...(dndRows && {
                            components: {
                                body: {
                                    wrapper: DraggableWrapper,
                                    row: DraggableRow,
                                },
                            },
                        })}
                    />
                    <DragOverlay>
                        {activeId ? (
                            <div
                                className={cn(tableWrapperClassName, styles.wrapper__DndOverlay)}
                                style={style}
                            >
                                <RcTable<RecordType>
                                    scroll={tableProps.scroll}
                                    prefixCls="admiral-table"
                                    data={dragOverlayData}
                                    rowKey={getRowKey}
                                    columns={transformedDnDColumns}
                                    style={overlayStyle}
                                    showHeader={false}
                                    sticky
                                />
                            </div>
                        ) : null}
                    </DragOverlay>
                    {bottomPaginationNode}
                </Spin>
            </div>
        </DndContext>
    )
}

function NoData({ emptyText }: TableLocale) {
    return (
        <div className={styles.empty}>
            <IoFileTrayOutline />
            <div>{emptyText}</div>
        </div>
    )
}

const ForwardTable = forwardRef(InternalTable) as <T>(
    props: TableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => ReturnType<typeof InternalTable>

type ForwardTableType = typeof ForwardTable
interface TableInterface extends ForwardTableType {
    Column: typeof Column
}

export const Table = ForwardTable as TableInterface
Table.Column = Column
