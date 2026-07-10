import { Key, GetRowKey } from '../interfaces.js';
export default function useLazyKVMap<RecordType>(data: readonly RecordType[], getRowKey: GetRowKey<RecordType>): ((key: Key) => RecordType)[];
