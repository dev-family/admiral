import {
    GetRowKey,
    ColumnType as RcColumnType,
    RenderedCell as RcRenderedCell,
    ExpandableConfig,
} from 'rc-table/lib/interface'

export interface ColumnType<RecordType> extends RcColumnType<RecordType> {}

export type ColumnsType<RecordType = unknown> = ColumnType<RecordType>[]
