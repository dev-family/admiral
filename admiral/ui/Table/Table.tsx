import React, { forwardRef, useMemo } from 'react'
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
} from './interfaces'
import useSorter, { SorterResult, getSortData } from './hooks/useSorter'
import usePagination, { getPaginationParam, DEFAULT_PAGE_SIZE } from './hooks/usePagination'
import useSelection from './hooks/useSelection'
import useLazyKVMap from './hooks/useLazyKVMap'
import { Pagination } from '../Pagination'
import { Spin, SpinProps } from '../Spin'
import styles from './Table.module.scss'
import Icon from '@/assets/icons'

// TODO: sorter tooltip
// TODO: table locale
// TODO: docs: sortDirections/sorter (Table props), sortDirections/defaultSortOrder/sorter (Column props)
// TODO: docs: rowSelection properties

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
        children,
        ...tableProps
    } = props

    const data: readonly RecordType[] = dataSource || EMPTY_LIST

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
        sortDirections: sortDirections || ['ascend', 'descend'],
        controlledSorter: sorter,
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

    return (
        <div
            ref={wrapperRef}
            className={cn(styles.wrapper, wrapperClassName, {
                [styles.wrapper__SizeMiddle]: size === 'middle',
                [styles.wrapper__SizeSmall]: size === 'small',
                [styles.wrapper__Bordered]: bordered,
            })}
            style={style}
        >
            <Spin spinning={false} {...spinProps}>
                {topPaginationNode}
                <RcTable<RecordType>
                    {...tableProps}
                    prefixCls="admiral-table"
                    columns={transformedSelectionColumns}
                    data={pageData}
                    rowKey={getRowKey}
                />
                {bottomPaginationNode}
            </Spin>
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
