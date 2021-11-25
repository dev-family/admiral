import {
    GetRowKey,
    ColumnType as RcColumnType,
    RenderedCell as RcRenderedCell,
    ExpandableConfig,
} from 'rc-table/lib/interface'
import { SortOrder } from './hooks/useSorter'

export type Key = React.Key
export type CompareFn<T> = (a: T, b: T, sortOrder?: SortOrder) => number
export interface ColumnType<RecordType> extends RcColumnType<RecordType> {
    // Sorter
    sorter?: boolean | CompareFn<RecordType>
    defaultSortOrder?: SortOrder
    sortDirections?: SortOrder[]
}

export type ColumnsType<RecordType = unknown> = ColumnType<RecordType>[]

export interface ColumnTitleProps<RecordType> {
    sortColumns?: { column: ColumnType<RecordType>; order: SortOrder }[]
}

export type ColumnTitle<RecordType> =
    | React.ReactNode
    | ((props: ColumnTitleProps<RecordType>) => React.ReactNode)

export type TransformColumns<RecordType> = (
    columns: ColumnsType<RecordType>,
) => ColumnsType<RecordType>
