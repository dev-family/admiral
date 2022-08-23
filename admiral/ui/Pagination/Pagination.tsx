import React from 'react'
import RcPagination, { PaginationProps as RcPaginationProps } from 'rc-pagination'
import { enUs, ruRu } from './locales'
import styles from './Pagination.module.scss'
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import cn from 'classnames'
import { PaginationProps } from './interfaces'
import { MiniSelect, MiddleSelect } from './PaginationSelect'

// TODO: showQuickJumper (after Input ready)

const itemRender: RcPaginationProps['itemRender'] = (current, type, element) => {
    const ellipsis = <span className={styles.control_Ellipsis}>•••</span>

    if (type === 'page') {
        return (
            <button className={styles.page} type="button" tabIndex={-1}>
                {current}
            </button>
        )
    }

    if (type === 'prev') {
        return (
            <button className={styles.control} type="button" tabIndex={-1}>
                <FiChevronLeft />
            </button>
        )
    }

    if (type === 'next') {
        return (
            <button className={styles.control} type="button" tabIndex={-1}>
                <FiChevronRight />
            </button>
        )
    }

    if (type === 'jump-prev') {
        return (
            <button type="button" tabIndex={-1} className={styles.control}>
                <span className={styles.control_Icon}>
                    <FiChevronsLeft />
                </span>
                {ellipsis}
            </button>
        )
    }

    if (type === 'jump-next') {
        return (
            <button type="button" tabIndex={-1} className={styles.control}>
                <span className={styles.control_Icon}>
                    <FiChevronsRight />
                </span>
                {ellipsis}
            </button>
        )
    }

    return element
}

const defaultLocale = enUs

export const Pagination = ({ size, className, locale, ...restProps }: PaginationProps) => {
    const paginationLocale = { ...defaultLocale, ...locale }
    const isSmall = size === 'small'

    const extendedClassName = cn(
        styles.pagination,
        {
            [styles.pagination__Small]: isSmall,
        },
        className,
    )

    return (
        <RcPagination
            {...restProps}
            prefixCls="pagination"
            className={extendedClassName}
            locale={paginationLocale}
            itemRender={itemRender}
            selectComponentClass={isSmall ? MiniSelect : MiddleSelect}
        />
    )
}
