import { TablePaginationConfig } from '../interfaces'
export declare const DEFAULT_PAGE_SIZE = 10
export declare type PaginationParam = {
    current: number
    pageSize: number
    total: number
}
export declare function getPaginationParam(
    mergedPagination: TablePaginationConfig,
): Partial<PaginationParam>
export default function usePagination(
    total: number,
    pagination: TablePaginationConfig | false | undefined,
    onChange: (current: number, pageSize: number) => void,
): [TablePaginationConfig, () => void]
