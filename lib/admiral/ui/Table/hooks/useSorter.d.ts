import { ColumnsType, ColumnType, Key } from '../interfaces'
export declare type SortOrder = 'desc' | 'asc' | null
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
export default function useSorter<RecordType>({
    mergedColumns,
    onSorterChange,
    sortDirections,
    controlledSorter,
}: SorterConfig<RecordType>): [
    ColumnsType<RecordType>,
    SortState<RecordType> | null,
    () => SorterResult<RecordType>,
]
export declare function getSortData<RecordType>(
    data: readonly RecordType[],
    sortState: SortState<RecordType> | null,
): RecordType[]
export {}
