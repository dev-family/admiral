import { PaginationLocale, PaginationProps as RcPaginationProps } from 'rc-pagination';
export interface PaginationProps extends Omit<RcPaginationProps, 'prevIcon' | 'nextIcon' | 'jumpPrevIcon' | 'jumpNextIcon' | 'locale' | 'itemRender'> {
    size?: 'default' | 'small';
    locale?: 'ruRu' | 'enUs';
    localeConfig?: PaginationLocale;
}
