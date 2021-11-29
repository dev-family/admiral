import React, { forwardRef, useMemo } from 'react'
import RcTable from 'rc-table'
import cn from 'classnames'
import { convertChildrenToColumns } from 'rc-table/lib/hooks/useColumns'
import { ColumnsType, ColumnType, TableProps, ChangeEventInfo, TableAction } from './interfaces'
import useSorter, { SorterResult, getSortData } from './hooks/useSorter'
import styles from './Table.module.scss'

// TODO: loading spinner
// TODO: pagination
// TODO: controlled sorter
// TODO: sorter tooltip
// TODO: docs: sortDirections/sorter (Table props), sortDirections/defaultSortOrder/sorter (Column props)

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
        onChange,
        children,
        ...tableProps
    } = props

    const data: readonly RecordType[] = dataSource || EMPTY_LIST

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
            onChange(changeInfo.sorter!, { action })
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
    const sortedData = React.useMemo(() => getSortData(data, sortState), [data, sortState])

    changeEventInfo.sorter = getSorters()

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
            <RcTable<RecordType>
                {...tableProps}
                prefixCls="admiral-table"
                columns={transformedColumns}
                data={sortedData}
            />
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
