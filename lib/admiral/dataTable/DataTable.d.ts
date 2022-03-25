/// <reference types="react" />
import { ColumnsType } from '../ui/Table/interfaces'
import { ControlledSorter } from '../ui/Table/hooks/useSorter'
export declare type DataTableProps<RecordType> = {
    resource: string
    columns: ColumnsType<RecordType>
    initialSorter?: ControlledSorter
}
export declare function DataTable<RecordType>({
    resource,
    columns,
    initialSorter,
}: DataTableProps<RecordType>): JSX.Element
