import React from 'react'
import RcPagination, { PaginationProps as RcPaginationProps } from 'rc-pagination'
import { enUs, ruRu } from './locales'
import styles from './Pagination.module.scss'
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import cn from 'classnames'
import { PaginationProps } from './interfaces'

// TODO: simple (after Input ready)
// TODO: showQuickJumper (after Input ready)
// TODO: showSizeChanger (need selectComponentClass, after Select ready)

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

export const Pagination = ({
    size,
    className,
    locale: localeName,
    localeConfig,
    ...restProps
}: PaginationProps) => {
    const locale = localeConfig ? localeConfig : localeName === 'enUs' ? enUs : ruRu

    const extendedClassName = cn(
        styles.pagination,
        {
            [styles.pagination__Small]: size === 'small',
        },
        className,
    )

    return (
        <RcPagination
            {...restProps}
            prefixCls="admiral-pagination"
            className={extendedClassName}
            locale={locale}
            itemRender={itemRender}
        />
    )
}
