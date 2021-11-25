import React, { useState } from 'react'
import {
    ColumnsType,
    ColumnType,
    Key,
    ColumnTitleProps,
    TransformColumns,
    CompareFn,
} from '../interfaces'
import { getColumnKey, getColumnPos } from '../util'
import classNames from 'classnames'

export type SortOrder = 'descend' | 'ascend' | null

export interface SortState<RecordType> {
    column: ColumnType<RecordType>
    key: Key
    sortOrder: SortOrder | null
}
export interface SorterResult<RecordType> {
    column?: ColumnType<RecordType>
    order?: SortOrder
    field?: Key | readonly Key[]
    columnKey?: Key
}

interface SorterConfig<RecordType> {
    mergedColumns: ColumnsType<RecordType>
    onSorterChange: (
        sorterResult: SorterResult<RecordType> | SorterResult<RecordType>[],
        sortStates: SortState<RecordType>[],
    ) => void
    sortDirections: SortOrder[]
}

function collectSortStates<RecordType>(
    columns: ColumnsType<RecordType>,
    init: boolean,
): SortState<RecordType>[] {
    let sortStates: SortState<RecordType>[] = []

    ;(columns || []).forEach((column, index) => {
        const columnPos = getColumnPos(index)

        if (column.sorter) {
            if (init && column.defaultSortOrder && sortStates.length === 0) {
                sortStates.push({
                    column,
                    key: getColumnKey(column, columnPos),
                    sortOrder: column.defaultSortOrder!,
                })
            }
        }
    })

    return sortStates
}

export default function useSorter<RecordType>({
    mergedColumns,
    onSorterChange,
    sortDirections,
}: SorterConfig<RecordType>): [
    TransformColumns<RecordType>,
    SortState<RecordType>[],
    ColumnTitleProps<RecordType>,
    () => SorterResult<RecordType> | SorterResult<RecordType>[],
] {
    const [sortStates, setSortStates] = useState<SortState<RecordType>[]>(
        collectSortStates(mergedColumns, true),
    )

    const mergedSorterStates = React.useMemo(() => {
        const collectedStates = collectSortStates(mergedColumns, false)

        // Return if not controlled
        if (!collectedStates.length) {
            return sortStates
        }

        return collectedStates
    }, [mergedColumns, sortStates])

    // Get render columns title required props
    const columnTitleSorterProps = React.useMemo<ColumnTitleProps<RecordType>>(() => {
        const sortColumns = mergedSorterStates.map(({ column, sortOrder }) => ({
            column,
            order: sortOrder,
        }))

        return {
            sortColumns,
        }
    }, [mergedSorterStates])

    function triggerSorter(sortState: SortState<RecordType>) {
        let newSorterStates = [sortState]

        setSortStates(newSorterStates)
        onSorterChange(generateSorterInfo(newSorterStates), newSorterStates)
    }

    const transformColumns = (innerColumns: ColumnsType<RecordType>) => {
        return injectSorter(innerColumns, mergedSorterStates, triggerSorter, sortDirections)
    }

    const getSorters = () => generateSorterInfo(mergedSorterStates)

    return [transformColumns, mergedSorterStates, columnTitleSorterProps, getSorters]
}

function nextSortDirection(sortDirections: SortOrder[], current: SortOrder | null) {
    if (!current) {
        return sortDirections[0]
    }

    return sortDirections[sortDirections.indexOf(current) + 1]
}

const ASCEND = 'ascend'
const DESCEND = 'descend'

function injectSorter<RecordType>(
    columns: ColumnsType<RecordType>,
    sorterSates: SortState<RecordType>[],
    triggerSorter: (sorterSates: SortState<RecordType>) => void,
    defaultSortDirections: SortOrder[],
    pos?: string,
): ColumnsType<RecordType> {
    return (columns || []).map((column, index) => {
        const columnPos = getColumnPos(index, pos)
        let newColumn: ColumnsType<RecordType>[number] = column

        if (newColumn.sorter) {
            const sortDirections: SortOrder[] = newColumn.sortDirections || defaultSortDirections
            const columnKey = getColumnKey(newColumn, columnPos)
            const sorterState = sorterSates.find(({ key }) => key === columnKey)
            const sorterOrder = sorterState ? sorterState.sortOrder : null
            const nextSortOrder = nextSortDirection(sortDirections, sorterOrder)
            const upNode: React.ReactNode = sortDirections.includes(ASCEND) && (
                <span
                    role="img"
                    className={classNames('column-sorter-up', {
                        active: sorterOrder === ASCEND,
                    })}
                />
            )
            const downNode: React.ReactNode = sortDirections.includes(DESCEND) && (
                <span
                    role="img"
                    className={classNames('column-sorter-down', {
                        active: sorterOrder === DESCEND,
                    })}
                />
            )
            newColumn = {
                ...newColumn,
                className: classNames(newColumn.className, {
                    [`column-sort`]: sorterOrder,
                }),
                title: (
                    <div className={`column-sorters`}>
                        <span className={`column-title`}>{column.title}</span>
                        <span
                            className={classNames(`column-sorter`, {
                                [`column-sorter-full`]: !!(upNode && downNode),
                            })}
                        >
                            <span className={`column-sorter-inner`}>
                                {upNode}
                                {downNode}
                            </span>
                        </span>
                    </div>
                ),
                onHeaderCell: (col) => {
                    const cell: React.HTMLAttributes<HTMLElement> =
                        (column.onHeaderCell && column.onHeaderCell(col)) || {}
                    const originOnClick = cell.onClick
                    cell.onClick = (event: React.MouseEvent<HTMLElement>) => {
                        console.log('click header cell: ')
                        triggerSorter({
                            column,
                            key: columnKey,
                            sortOrder: nextSortOrder,
                        })

                        if (originOnClick) {
                            originOnClick(event)
                        }
                    }

                    cell.className = classNames(cell.className, `column-has-sorters`)

                    return cell
                },
            }
        }

        return newColumn
    })
}

function stateToInfo<RecordType>(sorterStates: SortState<RecordType>) {
    const { column, sortOrder } = sorterStates
    return { column, order: sortOrder, field: column.dataIndex, columnKey: column.key }
}

function generateSorterInfo<RecordType>(
    sorterStates: SortState<RecordType>[],
): SorterResult<RecordType> | SorterResult<RecordType>[] {
    const list = sorterStates.filter(({ sortOrder }) => sortOrder).map(stateToInfo)

    if (list.length <= 1) {
        return list[0] || {}
    }

    return list
}

function getSortFunction<RecordType>(
    sorter: ColumnType<RecordType>['sorter'],
): CompareFn<RecordType> | false {
    if (typeof sorter === 'function') {
        return sorter
    }

    return false
}

export function getSortData<RecordType>(
    data: readonly RecordType[],
    sortStates: SortState<RecordType>[],
): RecordType[] {
    const cloneData = data.slice()

    const runningSorters = sortStates.filter(
        ({ column: { sorter }, sortOrder }) => getSortFunction(sorter) && sortOrder,
    )

    // Skip if no sorter needed
    if (!runningSorters.length) {
        return cloneData
    }

    return cloneData.sort((record1, record2) => {
        for (let i = 0; i < runningSorters.length; i += 1) {
            const sorterState = runningSorters[i]
            const {
                column: { sorter },
                sortOrder,
            } = sorterState

            const compareFn = getSortFunction(sorter)

            if (compareFn && sortOrder) {
                const compareResult = compareFn(record1, record2, sortOrder)

                if (compareResult !== 0) {
                    return sortOrder === ASCEND ? compareResult : -compareResult
                }
            }
        }

        return 0
    })
}
