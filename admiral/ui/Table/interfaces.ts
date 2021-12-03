import { TableProps as RcTableProps } from 'rc-table/lib/Table'
import { ColumnType as RcColumnType } from 'rc-table/lib/interface'
import { SorterResult, SortOrder, ControlledSorter } from './hooks/useSorter'
import { PaginationParam } from './hooks/usePagination'
import { PaginationProps } from '../Pagination'
import { tuple } from '@/admiral/utils/type'

export type Key = React.Key
export type CompareFn<T> = (a: T, b: T, sortOrder?: SortOrder) => number
export interface ColumnType<RecordType> extends RcColumnType<RecordType> {
    // Sorter
    sorter?: boolean | CompareFn<RecordType>
    defaultSortOrder?: SortOrder
    sortDirections?: SortOrder[]
}

export type ColumnsType<RecordType = unknown> = ColumnType<RecordType>[]

export type SizeType = 'small' | 'middle' | 'large'

export interface ChangeEventInfo<RecordType> {
    sorter: SorterResult<RecordType>
    pagination: {
        current?: number
        pageSize?: number
        total?: number
    }
    resetPagination: Function
}

const TableActions = tuple('paginate', 'sort', 'filter')
export type TableAction = typeof TableActions[number]

export interface TableExtra {
    action: TableAction
}

export interface TableProps<RecordType>
    extends Omit<
        RcTableProps<RecordType>,
        'transformColumns' | 'internalHooks' | 'internalRefs' | 'data' | 'columns' | 'emptyText'
    > {
    dataSource?: RcTableProps<RecordType>['data']
    columns?: ColumnsType<RecordType>
    pagination?: false | TablePaginationConfig
    size?: SizeType
    bordered?: boolean
    onChange?: (
        pagination: Partial<PaginationParam>,
        sorter: SorterResult<RecordType>,
        extra: TableExtra,
    ) => void
    sortDirections?: SortOrder[]
    sorter?: ControlledSorter | null
}

export type TablePaginationPosition =
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight'

export interface TablePaginationConfig extends PaginationProps {
    position?: TablePaginationPosition[]
}
