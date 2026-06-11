import { ColumnsType, ColumnType, Key, TableLocale, SortOrder, SorterResult, ControlledSorter } from '../interfaces.js';
import type { TooltipProps } from '../../Tooltip/interfaces.js';
export type { SortOrder, SorterResult, ControlledSorter };
export interface SortState<RecordType> {
    column: ColumnType<RecordType>;
    key: Key;
    sortOrder: SortOrder | null;
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
