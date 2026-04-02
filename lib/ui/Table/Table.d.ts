import React from 'react';
import { ColumnType, TableProps } from './interfaces';
declare function Column<RecordType>(_: ColumnType<RecordType>): null;
declare function InternalTable<RecordType extends object = any>({ ref: wrapperRef, ...props }: TableProps<RecordType> & {
    ref?: React.Ref<HTMLDivElement>;
}): import("react/jsx-runtime").JSX.Element;
type InternalTableType = typeof InternalTable;
interface TableInterface extends InternalTableType {
    Column: typeof Column;
}
export declare const Table: TableInterface;
export {};
