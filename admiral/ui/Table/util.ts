import { ColumnType, Key } from './interfaces'

export function getColumnKey<RecordType>(column: ColumnType<RecordType>, defaultKey: string): Key {
    if ('key' in column && column.key !== undefined && column.key !== null) {
        return column.key
    }
    if (column.dataIndex) {
        return (
            Array.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex
        ) as Key
    }

    return defaultKey
}

export function getColumnPos(index: number, pos?: string) {
    return pos ? `${pos}-${index}` : `${index}`
}
