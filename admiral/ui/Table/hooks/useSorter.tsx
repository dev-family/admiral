import React, { useState, useMemo, useEffect } from 'react'
import { ColumnsType, ColumnType, Key, CompareFn } from '../interfaces'
import { getColumnKey, getColumnPos } from '../util'
import classNames from 'classnames'

export type SortOrder = 'desc' | 'asc' | null

export interface ControlledSorter {
    columnKey: Key
    order: SortOrder
}
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
    onSorterChange: (sorterResult: SorterResult<RecordType>) => void
    sortDirections: SortOrder[]
    controlledSorter?: ControlledSorter | null
}

function collectSortState<RecordType>(
    columns: ColumnsType<RecordType>,
    controlledSorter?: ControlledSorter | null,
): SortState<RecordType> | null {
    let sortState: SortState<RecordType> | null = null

    ;(columns || []).forEach((column, index) => {
        const columnPos = getColumnPos(index)

        if (controlledSorter) {
            if (column.sorter && column.key === controlledSorter.columnKey) {
                sortState = {
                    column,
                    key: getColumnKey(column, columnPos),
                    sortOrder: controlledSorter.order,
                }
            }
        } else if (column.sorter && column.defaultSortOrder) {
            sortState = {
                column,
                key: getColumnKey(column, columnPos),
                sortOrder: column.defaultSortOrder!,
            }
        }
    })

    return sortState
}

export default function useSorter<RecordType>({
    mergedColumns,
    onSorterChange,
    sortDirections,
    controlledSorter,
}: SorterConfig<RecordType>): [
    ColumnsType<RecordType>,
    SortState<RecordType> | null,
    () => SorterResult<RecordType>,
] {
    const [sortState, setSortState] = useState<SortState<RecordType> | null>(
        collectSortState(mergedColumns, controlledSorter),
    )

    useEffect(() => {
        const { columnKey, order } = controlledSorter || {}
        if (columnKey !== sortState?.key || order !== sortState?.sortOrder) {
            setSortState(collectSortState(mergedColumns, controlledSorter))
        }
    }, [controlledSorter])

    function triggerSorter(sortState: SortState<RecordType>) {
        setSortState(sortState)
        onSorterChange(generateSorterInfo(sortState))
    }

    const transformedColumns = useMemo(
        () => injectSorter(mergedColumns, sortState, triggerSorter, sortDirections),
        [sortState, triggerSorter],
    )

    const getSorters = () => generateSorterInfo(sortState)

    return [transformedColumns, sortState, getSorters]
}

function nextSortDirection(sortDirections: SortOrder[], current: SortOrder | null) {
    if (!current) {
        return sortDirections[0]
    }

    return sortDirections[sortDirections.indexOf(current) + 1]
}

enum directions {
    ascend = 'asc',
    descend = 'desc',
}

function injectSorter<RecordType>(
    columns: ColumnsType<RecordType>,
    sorterState: SortState<RecordType> | null,
    triggerSorter: (sorterState: SortState<RecordType>) => void,
    defaultSortDirections: SortOrder[],
    pos?: string,
): ColumnsType<RecordType> {
    return (columns || []).map((column, index) => {
        const columnPos = getColumnPos(index, pos)
        let newColumn: ColumnsType<RecordType>[number] = column

        if (newColumn.sorter) {
            const sortDirections: SortOrder[] = newColumn.sortDirections || defaultSortDirections
            const columnKey = getColumnKey(newColumn, columnPos)
            const columnSorterState = sorterState?.key === columnKey ? sorterState : null
            const sorterOrder = columnSorterState ? columnSorterState.sortOrder : null
            const nextSortOrder = nextSortDirection(sortDirections, sorterOrder)
            const upNode: React.ReactNode = sortDirections.includes(directions.ascend) && (
                <span
                    role="img"
                    className={classNames('column-sorter-up', {
                        active: sorterOrder === directions.ascend,
                    })}
                />
            )
            const downNode: React.ReactNode = sortDirections.includes(directions.descend) && (
                <span
                    role="img"
                    className={classNames('column-sorter-down', {
                        active: sorterOrder === directions.descend,
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

function stateToInfo<RecordType>(sorterState: SortState<RecordType>) {
    const { column, sortOrder } = sorterState
    return { column, order: sortOrder, field: column.dataIndex, columnKey: column.key }
}

function generateSorterInfo<RecordType>(
    sorterState: SortState<RecordType> | null,
): SorterResult<RecordType> {
    if (sorterState && sorterState.sortOrder) return stateToInfo(sorterState)

    return {}
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
    sortState: SortState<RecordType> | null,
): RecordType[] {
    const cloneData = data.slice()
    const runningSorter = sortState

    // Skip if no sorter needed
    if (!runningSorter) {
        return cloneData
    }

    return cloneData.sort((record1, record2) => {
        const {
            column: { sorter },
            sortOrder,
        } = runningSorter

        const compareFn = getSortFunction(sorter)

        if (compareFn && sortOrder) {
            const compareResult = compareFn(record1, record2, sortOrder)

            if (compareResult !== 0) {
                return sortOrder === directions.ascend ? compareResult : -compareResult
            }
        }

        return 0
    })
}
