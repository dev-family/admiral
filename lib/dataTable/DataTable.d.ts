import React from 'react';
import { ColumnsType, TableLocale, TableProps, Key } from '../ui/Table/interfaces.js';
import { PaginationLocale } from '../ui/Pagination/interfaces.js';
export type DataTableProps<RecordType> = {
    resource: string;
    columns: ColumnsType<RecordType>;
    locale?: Partial<{
        table: TableLocale;
        pagination: PaginationLocale & {
            total: (total: number) => string;
        };
    }>;
    config?: DataTableConfig<RecordType>;
    autoupdateTime?: number;
};
export interface DataTableConfig<RecordType> extends Pick<TableProps<RecordType>, 'dndRows' | 'showSorterTooltip' | 'bordered' | 'size' | 'title' | 'footer'> {
    rowSelection?: DataTableRowSelectionConfig<RecordType>;
    autoupdateTime?: number;
}
export type DataTableRowSelectionConfig<RecordType> = {
    render: ({ selectedRowKeys, selectedRows, refresh, }: {
        selectedRowKeys: Key[];
        selectedRows: RecordType[];
        refresh: () => void;
    }) => React.ReactNode;
    onSelectionChange?: (selectedRowKeys: Key[], selectedRows: RecordType[]) => void;
};
export declare function DataTable<RecordType extends {
    id: number | string;
}>({ resource, columns, locale, config, autoupdateTime, }: DataTableProps<RecordType>): import("react/jsx-runtime").JSX.Element;
