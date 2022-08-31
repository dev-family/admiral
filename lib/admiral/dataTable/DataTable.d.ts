import React from 'react';
import { ColumnsType, TableLocale, TableProps, Key } from '../ui/Table/interfaces';
import { PaginationLocale } from '../ui/Pagination/interfaces';
import { ControlledSorter } from '../ui/Table/hooks/useSorter';
export declare type DataTableProps<RecordType> = {
    resource: string;
    columns: ColumnsType<RecordType>;
    initialSorter?: ControlledSorter;
    locale?: Partial<{
        table: TableLocale;
        pagination: PaginationLocale & {
            total: (total: number) => string;
        };
    }>;
    config?: DataTableConfig<RecordType>;
};
export interface DataTableConfig<RecordType> extends Pick<TableProps<RecordType>, 'dndRows' | 'showSorterTooltip' | 'bordered' | 'size' | 'title' | 'footer'> {
    rowSelection?: DataTableRowSelectionConfig<RecordType>;
}
export declare type DataTableRowSelectionConfig<RecordType> = {
    render: (selectedRowKeys: Key[], selectedRows: RecordType[]) => React.ReactNode;
    onSelectionChange?: (selectedRowKeys: Key[], selectedRows: RecordType[]) => void;
};
export declare function DataTable<RecordType extends {
    id: number | string;
}>({ resource, columns, locale, config, }: DataTableProps<RecordType>): JSX.Element;
