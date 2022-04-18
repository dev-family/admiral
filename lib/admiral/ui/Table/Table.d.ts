import React from 'react';
import { ColumnType, TableProps } from './interfaces';
declare function Column<RecordType>(_: ColumnType<RecordType>): null;
declare function InternalTable<RecordType extends object = any>(props: TableProps<RecordType>, wrapperRef: React.ForwardedRef<HTMLDivElement>): JSX.Element;
declare const ForwardTable: <T>(props: TableProps<T> & {
    ref?: React.ForwardedRef<HTMLDivElement> | undefined;
}) => ReturnType<typeof InternalTable>;
declare type ForwardTableType = typeof ForwardTable;
interface TableInterface extends ForwardTableType {
    Column: typeof Column;
}
export declare const Table: TableInterface;
export {};
