import type { ReactNode } from 'react';
import { ColumnsType, ColumnType } from '../ui/Table/interfaces';
import { DataTableConfig } from '../dataTable';
import { DrawerProps } from '../ui/Drawer/interfaces';
export declare type CRUDActionsLocale = {
    submit: string;
    back: string;
    tableColumn: string;
    paginationTotal: (total: number) => string;
};
declare type CRUDForm = {
    fields: React.ReactNode;
    children?: never;
} | {
    fields?: never;
    children: React.ReactNode;
};
export declare type CRUDFormCreate = CRUDForm;
export declare type CRUDFormEdit = CRUDForm;
export declare type CRUDFilter = {
    topToolbarButtonText: string;
    fields: JSX.Element;
    /**
     * #### Add the 'name' keys to the array from filter.fields, if you want to make the filters quick.
     *
     * Here's a simple example:
     *
     * ```quickFilters: ['name', 'age', 'is_active']```
     *
     * You can find an example of a page with quick filters by following the link: {@link https://github.com/dev-family/admiral/blob/master/src/crud/quickFilters.tsx}
     */
    quickFilters?: [string, ...string[]];
};
export declare type CRUDConfig<RecordType> = {
    path: string;
    actions?: React.ReactNode;
    resource: string;
    index: {
        title: string;
        newButtonText: string;
        tableColumns: ColumnsType<RecordType>;
        tableActions?: ColumnType<RecordType> | null;
        tableConfig?: DataTableConfig<RecordType>;
    };
    form: {
        create: CRUDFormCreate;
        edit: CRUDFormEdit;
    };
    create?: {
        title?: string;
    };
    update?: {
        title?: (id: string) => string;
        view?: 'page' | 'drawer';
        drawer?: DrawerProps & {
            routePath?: (path: string) => string;
        };
    };
    filter?: CRUDFilter;
    topContent?: ReactNode;
    bottomContent?: ReactNode;
};
export {};
