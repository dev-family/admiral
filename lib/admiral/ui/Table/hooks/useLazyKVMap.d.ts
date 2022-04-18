import { Key, GetRowKey } from '../interfaces';
export default function useLazyKVMap<RecordType>(data: readonly RecordType[], getRowKey: GetRowKey<RecordType>): ((key: Key) => RecordType)[];
