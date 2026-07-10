import { ColumnType, Key } from './interfaces.js';
export declare function getColumnKey<RecordType>(column: ColumnType<RecordType>, defaultKey: string): Key;
export declare function getColumnPos(index: number, pos?: string): string;
