import React from 'react';
import { TableRowSelection, Key, GetRowKey, TransformColumns } from '../interfaces';
export declare type GetCheckDisabled<RecordType> = (record: RecordType) => boolean;
export declare function arrDel(list: Key[], value: Key): React.Key[];
export declare function arrAdd(list: Key[], value: Key): React.Key[];
interface UseSelectionConfig<RecordType> {
    prefixCls: string;
    pageData: RecordType[];
    getRowKey: GetRowKey<RecordType>;
    getRecordByKey: (key: Key) => RecordType;
}
export default function useSelection<RecordType>(rowSelection: TableRowSelection<RecordType> | undefined, config: UseSelectionConfig<RecordType>): [TransformColumns<RecordType>, Set<Key>];
export {};
