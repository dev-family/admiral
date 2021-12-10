import React, { useRef } from 'react'
import { Key, GetRowKey } from '../interfaces'

interface MapCache<RecordType> {
    data?: readonly RecordType[]
    kvMap?: Map<Key, RecordType>
    getRowKey?: Function
}

export default function useLazyKVMap<RecordType>(
    data: readonly RecordType[],
    getRowKey: GetRowKey<RecordType>,
) {
    const mapCacheRef = useRef<MapCache<RecordType>>({})

    function getRecordByKey(key: Key): RecordType {
        if (
            !mapCacheRef.current ||
            mapCacheRef.current.data !== data ||
            mapCacheRef.current.getRowKey !== getRowKey
        ) {
            const kvMap = new Map<Key, RecordType>()

            function dig(records: readonly RecordType[]) {
                records.forEach((record, index) => {
                    const rowKey = getRowKey(record, index)
                    kvMap.set(rowKey, record)
                })
            }

            dig(data)

            mapCacheRef.current = {
                data,
                kvMap,
                getRowKey,
            }
        }

        return mapCacheRef.current.kvMap!.get(key)!
    }

    return [getRecordByKey]
}
