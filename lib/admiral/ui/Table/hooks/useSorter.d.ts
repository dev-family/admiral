import { ColumnsType, ColumnType, Key, TableLocale } from '../interfaces';
import type { TooltipProps } from '../../Tooltip/interfaces';
export declare type SortOrder = 'desc' | 'asc' | null;
export interface ControlledSorter {
    columnKey: Key;
    order: SortOrder;
}
export interface SortState<RecordType> {
    column: ColumnType<RecordType>;
    key: Key;
    sortOrder: SortOrder | null;
}
export interface SorterResult<RecordType> {
    column?: ColumnType<RecordType>;
    order?: SortOrder;
    field?: Key | readonly Key[];
    columnKey?: Key;
}
interface SorterConfig<RecordType> {
    mergedColumns: ColumnsType<RecordType>;
    onSorterChange: (sorterResult: SorterResult<RecordType>) => void;
    sortDirections: SortOrder[];
    controlledSorter?: ControlledSorter | null;
    tableLocale?: TableLocale;
    showSorterTooltip?: boolean | TooltipProps;
}
export default function useSorter<RecordType>({ mergedColumns, onSorterChange, sortDirections, controlledSorter, tableLocale, showSorterTooltip, }: SorterConfig<RecordType>): [
    ColumnsType<RecordType>,
    SortState<RecordType> | null,
    () => SorterResult<RecordType>
];
export declare function getSortData<RecordType>(data: readonly RecordType[], sortState: SortState<RecordType> | null): RecordType[];
export {};
