import { useState } from 'react'
import { TablePaginationConfig } from '../interfaces'
import { PaginationProps } from '../../Pagination/interfaces'

export const DEFAULT_PAGE_SIZE = 10
const EMPTY_PAGINATION = {}
const EMPTY_RESET_FN = () => {}

export type PaginationParam = { current: number; pageSize: number; total: number }

export function getPaginationParam(mergedPagination: TablePaginationConfig) {
    const param: Partial<PaginationParam> = {}

    const paginationRecord = mergedPagination as Record<string, unknown>
    ;(['current', 'pageSize', 'total'] as const).forEach((key) => {
        if (paginationRecord[key] !== undefined) {
            param[key] = paginationRecord[key] as number
        }
    })

    return param
}

function extendsObject<T extends Record<string, unknown>>(...list: T[]): T {
    const result = {} as T

    list.forEach((obj) => {
        if (obj) {
            Object.keys(obj).forEach((key) => {
                const val = obj[key]
                if (val !== undefined) {
                    ;(result as Record<string, unknown>)[key] = val
                }
            })
        }
    })

    return result
}

export default function usePagination(
    total: number,
    pagination: TablePaginationConfig | false | undefined,
    onChange: (current: number, pageSize: number) => void,
): [TablePaginationConfig, () => void] {
    const { total: paginationTotal = 0, ...paginationObj } =
        pagination && typeof pagination === 'object' ? pagination : {}

    const [innerPagination, setInnerPagination] = useState<{
        current?: number
        pageSize?: number
    }>({
        current: paginationObj?.defaultCurrent ?? 1,
        pageSize: paginationObj?.defaultPageSize ?? DEFAULT_PAGE_SIZE,
    })

    // ============ Basic Pagination Config ============
    const mergedPagination = extendsObject<Partial<TablePaginationConfig>>(
        innerPagination,
        paginationObj,
        {
            total: paginationTotal > 0 ? paginationTotal : total,
        },
    )

    // Reset `current` if data length or pageSize changed
    const maxPage = Math.ceil((paginationTotal || total) / mergedPagination.pageSize!)
    if (mergedPagination.current! > maxPage) {
        // Prevent a maximum page count of 0
        mergedPagination.current = maxPage || 1
    }

    const refreshPagination = (current?: number, pageSize?: number) => {
        setInnerPagination({
            current: current ?? 1,
            pageSize: pageSize || mergedPagination.pageSize,
        })
    }

    const onInternalChange: PaginationProps['onChange'] = (current, pageSize) => {
        if (pagination) {
            pagination.onChange?.(current, pageSize)
        }
        refreshPagination(current, pageSize)
        onChange(current, pageSize || (mergedPagination?.pageSize ?? 10))
    }

    if (pagination === false) {
        return [EMPTY_PAGINATION, EMPTY_RESET_FN]
    }

    return [{ ...mergedPagination, onChange: onInternalChange }, refreshPagination]
}
