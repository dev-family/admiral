import {
    PaginationLocale as RcPaginationLocale,
    PaginationProps as RcPaginationProps,
} from 'rc-pagination'

export interface PaginationLocale extends RcPaginationLocale {}

export interface PaginationProps
    extends Omit<
        RcPaginationProps,
        'prevIcon' | 'nextIcon' | 'jumpPrevIcon' | 'jumpNextIcon' | 'locale' | 'itemRender'
    > {
    size?: 'default' | 'small'
    locale?: PaginationLocale
}
