import { TableProps as RcTableProps } from 'rc-table/lib/Table'
import { ColumnType as RcColumnType, GetRowKey } from 'rc-table/lib/interface'
import { SorterResult, SortOrder, ControlledSorter } from './hooks/useSorter'
import { CheckboxProps } from '../Checkbox/interfaces'
import { PaginationParam } from './hooks/usePagination'
import { PaginationProps } from '../Pagination/interfaces'
import { SpinProps } from '../Spin/interfaces'
import { tuple } from '../../utils/type'

export type { GetRowKey }

export type { SortOrder, SorterResult, ControlledSorter }

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

export type SelectionSelectFn<T> = (
    record: T,
    selected: boolean,
    selectedRows: T[],
    nativeEvent: Event,
) => void
export interface TableRowSelection<T> {
    /** Keep the selection keys in list even the key not exist in `dataSource` anymore */
    preserveSelectedRowKeys?: boolean
    selectedRowKeys?: Key[]
    defaultSelectedRowKeys?: Key[]
    onChange?: (selectedRowKeys: Key[], selectedRows: T[]) => void
    getCheckboxProps?: (record: T) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>>
    getTitleCheckboxProps?: () => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>>
    onSelect?: SelectionSelectFn<T>
    onSelectMultiple?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void
    onSelectNone?: () => void
    hideSelectAll?: boolean
    fixed?: boolean
    columnWidth?: string | number
    columnTitle?: string | React.ReactNode
    checkStrictly?: boolean
}

export type TransformColumns<RecordType> = (
    columns: ColumnsType<RecordType>,
) => ColumnsType<RecordType>

export interface TableProps<RecordType>
    extends Omit<
        RcTableProps<RecordType>,
        'transformColumns' | 'internalHooks' | 'internalRefs' | 'data' | 'columns' | 'emptyText'
    > {
    dataSource?: RcTableProps<RecordType>['data']
    columns?: ColumnsType<RecordType>
    pagination?: false | TablePaginationConfig
    loading?: boolean | SpinProps
    size?: SizeType
    bordered?: boolean
    onChange?: (
        pagination: Partial<PaginationParam>,
        sorter: SorterResult<RecordType>,
        extra: TableExtra,
    ) => void
    rowSelection?: TableRowSelection<RecordType>
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
