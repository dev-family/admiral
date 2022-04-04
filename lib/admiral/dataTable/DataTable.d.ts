/// <reference types="react" />
import { ColumnsType } from '../ui/Table/interfaces'
import { ControlledSorter } from '../ui/Table/hooks/useSorter'
export declare type DataTableProps<RecordType> = {
    resource: string
    columns: ColumnsType<RecordType>
    initialSorter?: ControlledSorter
    dndRows?: boolean
}
export declare function DataTable<
    RecordType extends {
        id: number | string
    },
>({ resource, columns, initialSorter, dndRows }: DataTableProps<RecordType>): JSX.Element
