import React, { forwardRef } from 'react'
import cn from 'classnames'
import RcTable, { Summary } from 'rc-table'
import { TableProps as RcTableProps, INTERNAL_HOOKS } from 'rc-table/lib/Table'
import styles from './Table.module.scss'
import { ColumnsType } from './interfaces'

// TODO: loading spinner
// TODO: pagination

export type SizeType = 'small' | 'middle' | 'large'

export interface TableProps<RecordType>
    extends Omit<
        RcTableProps<RecordType>,
        | 'transformColumns'
        | 'internalHooks'
        | 'internalRefs'
        | 'data'
        | 'columns'
        // | 'scroll'
        | 'emptyText'
    > {
    // dropdownPrefixCls?: string;
    dataSource?: RcTableProps<RecordType>['data']
    columns?: ColumnsType<RecordType>
    // pagination?: false | TablePaginationConfig;
    // loading?: boolean | SpinProps;
    size?: SizeType
    bordered?: boolean
    //   sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
    //   extra: TableCurrentDataSource<RecordType>,
    // ) => void;
    // rowSelection?: TableRowSelection<RecordType>;

    // getPopupContainer?: GetPopupContainer;
    // scroll?: RcTableProps<RecordType>['scroll'] & {
    //   scrollToFirstRowOnChange?: boolean;
    // };
    // sortDirections?: SortOrder[];
    // showSorterTooltip?: boolean | TooltipProps;
}

const EMPTY_LIST: any[] = []

function InternalTable<RecordType extends object = any>(
    props: TableProps<RecordType>,
    wrapperRef: React.ForwardedRef<HTMLDivElement>,
) {
    const {
        className: wrapperClassName,
        style,
        dataSource,
        columns,
        size = 'large',
        bordered = false,
        ...tableProps
    } = props

    const data: readonly RecordType[] = dataSource || EMPTY_LIST

    // >>>>>>>>> Spinning
    // let spinProps: SpinProps | undefined;
    // if (typeof loading === 'boolean') {
    //   spinProps = {
    //     spinning: loading,
    //   };
    // } else if (typeof loading === 'object') {
    //   spinProps = {
    //     spinning: true,
    //     ...loading,
    //   };
    // }

    return (
        <div
            ref={wrapperRef}
            className={cn(styles.wrapper, wrapperClassName, {
                [styles.wrapper__SizeMiddle]: size === 'middle',
                [styles.wrapper__SizeSmall]: size === 'small',
                [styles.wrapper__Bordered]: bordered,
            })}
            style={style}
        >
            {/* <Spin spinning={false} {...spinProps}> */}
            <RcTable<RecordType>
                {...tableProps}
                prefixCls="admiral-table"
                columns={columns}
                data={data}
                // direction={direction}
                // expandable={mergedExpandable}
                // className={classNames({
                //   [`${prefixCls}-middle`]: mergedSize === 'middle',
                //   [`${prefixCls}-small`]: mergedSize === 'small',
                //   [`${prefixCls}-bordered`]: bordered,
                //   [`${prefixCls}-empty`]: rawData.length === 0,
                // })}
                // rowKey={getRowKey}
                // rowClassName={internalRowClassName}
                // emptyText={(locale && locale.emptyText) || renderEmpty('Table')}
                // // Internal
                // internalHooks={INTERNAL_HOOKS}
                // internalRefs={internalRefs as any}
                // transformColumns={transformColumns}
            />
            {/* {bottomPaginationNode} */}
            {/* </Spin> */}
        </div>
    )
}

export const Table = forwardRef(InternalTable) as <T>(
    props: TableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => ReturnType<typeof InternalTable>
