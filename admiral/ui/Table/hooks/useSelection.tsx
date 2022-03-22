import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { FixedType } from 'rc-table/lib/interface'
import { useMergedState } from '@/admiral/utils/hooks'
import { Checkbox } from '../../Checkbox'
import { CheckboxProps } from '../../Checkbox/interfaces'
import { INTERNAL_COL_DEFINE } from 'rc-table'
import { TableRowSelection, Key, ColumnsType, GetRowKey, TransformColumns } from '../interfaces'

export type GetCheckDisabled<RecordType> = (record: RecordType) => boolean

export function arrDel(list: Key[], value: Key) {
    const clone = list.slice()
    const index = clone.indexOf(value)
    if (index >= 0) {
        clone.splice(index, 1)
    }
    return clone
}

export function arrAdd(list: Key[], value: Key) {
    const clone = list.slice()
    if (clone.indexOf(value) === -1) {
        clone.push(value)
    }
    return clone
}

function getFixedType<RecordType>(column: ColumnsType<RecordType>[number]): FixedType | undefined {
    return column && column.fixed
}

interface UseSelectionConfig<RecordType> {
    prefixCls: string
    pageData: RecordType[]
    getRowKey: GetRowKey<RecordType>
    getRecordByKey: (key: Key) => RecordType
}

export default function useSelection<RecordType>(
    rowSelection: TableRowSelection<RecordType> | undefined,
    config: UseSelectionConfig<RecordType>,
): [TransformColumns<RecordType>, Set<Key>] {
    const {
        preserveSelectedRowKeys,
        selectedRowKeys,
        defaultSelectedRowKeys,
        getCheckboxProps,
        getTitleCheckboxProps,
        onChange: onSelectionChange,
        onSelect,
        onSelectMultiple,
        columnWidth: selectionColWidth,
        fixed,
        hideSelectAll,
    } = rowSelection || {}

    const { prefixCls, pageData, getRecordByKey, getRowKey } = config

    // ========================= Keys =========================
    const [mergedSelectedKeys, setMergedSelectedKeys] = useMergedState(
        selectedRowKeys || defaultSelectedRowKeys || [],
        {
            value: selectedRowKeys,
        },
    )

    // ======================== Caches ========================
    const preserveRecordsRef = React.useRef(new Map<Key, RecordType>())

    const updatePreserveRecordsCache = useCallback(
        (keys: Key[]) => {
            if (preserveSelectedRowKeys) {
                const newCache = new Map<Key, RecordType>()
                // Keep key if mark as preserveSelectedRowKeys
                keys.forEach((key) => {
                    let record = getRecordByKey(key)

                    if (!record && preserveRecordsRef.current.has(key)) {
                        record = preserveRecordsRef.current.get(key)!
                    }

                    newCache.set(key, record)
                })
                // Refresh to new cache
                preserveRecordsRef.current = newCache
            }
        },
        [getRecordByKey, preserveSelectedRowKeys],
    )

    // Update cache with selectedKeys
    useEffect(() => {
        updatePreserveRecordsCache(mergedSelectedKeys)
    }, [mergedSelectedKeys])

    // Get flatten data
    const flattedData = pageData

    // Get all checkbox props
    const checkboxPropsMap = useMemo(() => {
        const map = new Map<Key, Partial<CheckboxProps>>()
        flattedData.forEach((record, index) => {
            const key = getRowKey(record, index)
            const checkboxProps = (getCheckboxProps ? getCheckboxProps(record) : null) || {}
            map.set(key, checkboxProps)
        })
        return map
    }, [flattedData, getRowKey, getCheckboxProps])

    const isCheckboxDisabled: GetCheckDisabled<RecordType> = useCallback(
        (r: RecordType) => !!checkboxPropsMap.get(getRowKey(r))?.disabled,
        [checkboxPropsMap, getRowKey],
    )

    const derivedSelectedKeySet: Set<Key> = useMemo(() => {
        const keys = mergedSelectedKeys || []
        return new Set(keys)
    }, [mergedSelectedKeys])

    // Save last selected key to enable range selection
    const [lastSelectedKey, setLastSelectedKey] = useState<Key | null>(null)

    // Reset if rowSelection reset
    useEffect(() => {
        if (!rowSelection) {
            setMergedSelectedKeys([])
        }
    }, [!!rowSelection])

    const setSelectedKeys = useCallback(
        (keys: Key[]) => {
            let availableKeys: Key[]
            let records: RecordType[]

            updatePreserveRecordsCache(keys)

            if (preserveSelectedRowKeys) {
                availableKeys = keys
                records = keys.map((key) => preserveRecordsRef.current.get(key)!)
            } else {
                // Filter key which not exist in the `dataSource`
                availableKeys = []
                records = []

                keys.forEach((key) => {
                    const record = getRecordByKey(key)
                    if (record !== undefined) {
                        availableKeys.push(key)
                        records.push(record)
                    }
                })
            }

            setMergedSelectedKeys(availableKeys)

            onSelectionChange?.(availableKeys, records)
        },
        [setMergedSelectedKeys, getRecordByKey, onSelectionChange, preserveSelectedRowKeys],
    )

    // ====================== Selections ======================
    // Trigger single `onSelect` event
    const triggerSingleSelection = useCallback(
        (key: Key, selected: boolean, keys: Key[], event: Event) => {
            if (onSelect) {
                const rows = keys.map((k) => getRecordByKey(k))
                onSelect(getRecordByKey(key), selected, rows, event)
            }

            setSelectedKeys(keys)
        },
        [onSelect, getRecordByKey, setSelectedKeys],
    )

    const mergedSelections = null

    // ======================= Columns ========================
    const transformColumns = useCallback(
        (columns: ColumnsType<RecordType>): ColumnsType<RecordType> => {
            if (!rowSelection) {
                return columns
            }

            // Support selection
            const keySet = derivedSelectedKeySet

            // Record key only need check with enabled
            const recordKeys = flattedData
                .map(getRowKey)
                .filter((key) => !checkboxPropsMap.get(key)!.disabled)
            const checkedCurrentAll = recordKeys.every((key) => keySet.has(key))
            const checkedCurrentSome = recordKeys.some((key) => keySet.has(key))

            const onSelectAllChange = () => {
                const changeKeys: Key[] = []

                if (checkedCurrentAll) {
                    recordKeys.forEach((key) => {
                        keySet.delete(key)
                        changeKeys.push(key)
                    })
                } else {
                    recordKeys.forEach((key) => {
                        if (!keySet.has(key)) {
                            keySet.add(key)
                            changeKeys.push(key)
                        }
                    })
                }

                const keys = Array.from(keySet)
                setSelectedKeys(keys)
            }

            // ===================== Render =====================
            // Title Cell
            let title: React.ReactNode
            const allDisabledData = flattedData
                .map((record, index) => {
                    const key = getRowKey(record, index)
                    const checkboxProps = checkboxPropsMap.get(key) || {}
                    return { checked: keySet.has(key), ...checkboxProps }
                })
                .filter(({ disabled }) => disabled)

            const allDisabled =
                !!allDisabledData.length && allDisabledData.length === flattedData.length

            const allDisabledAndChecked =
                allDisabled && allDisabledData.every(({ checked }) => checked)
            const allDisabledSomeChecked =
                allDisabled && allDisabledData.some(({ checked }) => checked)
            const titleCheckboxProps = getTitleCheckboxProps?.() ?? {}

            title = !hideSelectAll && (
                <div className={`${prefixCls}-selection`}>
                    <Checkbox
                        {...titleCheckboxProps}
                        checked={
                            !allDisabled
                                ? !!flattedData.length && checkedCurrentAll
                                : allDisabledAndChecked
                        }
                        indeterminate={
                            !allDisabled
                                ? !checkedCurrentAll && checkedCurrentSome
                                : !allDisabledAndChecked && allDisabledSomeChecked
                        }
                        onChange={onSelectAllChange}
                        disabled={flattedData.length === 0 || allDisabled}
                    />
                </div>
            )

            // Body Cell
            let renderCell: (
                _: RecordType,
                record: RecordType,
                index: number,
            ) => { node: React.ReactNode; checked: boolean }

            renderCell = (_, record, index) => {
                const key = getRowKey(record, index)
                const checked = keySet.has(key)
                const checkboxProps = checkboxPropsMap.get(key)
                let mergedIndeterminate = checkboxProps?.indeterminate ?? false

                // Record checked
                return {
                    node: (
                        <Checkbox
                            {...checkboxProps}
                            indeterminate={mergedIndeterminate}
                            checked={checked}
                            onClick={(e) => e.stopPropagation()}
                            onChange={({ event }) => {
                                const { shiftKey } = event as MouseEvent

                                let startIndex: number = -1
                                let endIndex: number = -1

                                // Get range of this
                                if (shiftKey) {
                                    const pointKeys = new Set([lastSelectedKey, key])

                                    recordKeys.some((recordKey, recordIndex) => {
                                        if (pointKeys.has(recordKey)) {
                                            if (startIndex === -1) {
                                                startIndex = recordIndex
                                            } else {
                                                endIndex = recordIndex
                                                return true
                                            }
                                        }

                                        return false
                                    })
                                }

                                if (endIndex !== -1 && startIndex !== endIndex) {
                                    // Batch update selections
                                    const rangeKeys = recordKeys.slice(startIndex, endIndex + 1)
                                    const changedKeys: Key[] = []

                                    if (checked) {
                                        rangeKeys.forEach((recordKey) => {
                                            if (keySet.has(recordKey)) {
                                                changedKeys.push(recordKey)
                                                keySet.delete(recordKey)
                                            }
                                        })
                                    } else {
                                        rangeKeys.forEach((recordKey) => {
                                            if (!keySet.has(recordKey)) {
                                                changedKeys.push(recordKey)
                                                keySet.add(recordKey)
                                            }
                                        })
                                    }

                                    const keys = Array.from(keySet)
                                    onSelectMultiple?.(
                                        !checked,
                                        keys.map((recordKey) => getRecordByKey(recordKey)),
                                        changedKeys.map((recordKey) => getRecordByKey(recordKey)),
                                    )

                                    setSelectedKeys(keys)
                                } else {
                                    // Single record selected
                                    const originCheckedKeys = mergedSelectedKeys

                                    const checkedKeys = checked
                                        ? arrDel(originCheckedKeys, key)
                                        : arrAdd(originCheckedKeys, key)
                                    triggerSingleSelection(key, !checked, checkedKeys, event)
                                }

                                setLastSelectedKey(key)
                            }}
                        />
                    ),
                    checked,
                }
            }

            const renderSelectionCell = (_: any, record: RecordType, index: number) => {
                const { node } = renderCell(_, record, index)
                return node
            }

            // Columns
            const selectionColumn = {
                width: selectionColWidth,
                className: `${prefixCls}-selection-column`,
                title: rowSelection.columnTitle || title,
                render: renderSelectionCell,
                [INTERNAL_COL_DEFINE]: {
                    className: `${prefixCls}-selection-col`,
                },
            }

            return [{ ...selectionColumn, fixed: fixed || getFixedType(columns[0]) }, ...columns]
        },
        [
            getRowKey,
            flattedData,
            rowSelection,
            mergedSelectedKeys,
            derivedSelectedKeySet,
            selectionColWidth,
            mergedSelections,
            lastSelectedKey,
            checkboxPropsMap,
            onSelectMultiple,
            triggerSingleSelection,
            isCheckboxDisabled,
        ],
    )

    return [transformColumns, derivedSelectedKeySet]
}
