import React, { useMemo } from 'react'
import { Table, TableColumnsType } from '../../../admiral'
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'

export interface IReview {
    id: number | string
    key: number | string
    product: string
    review: string
    date: string
}

const columns: TableColumnsType<IReview> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 60,
    },
    {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
        width: 250,
    },
    {
        title: 'Review',
        dataIndex: 'review',
        key: 'review',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: 140,
        render: (value) => {
            return (
                <span style={{ whiteSpace: 'nowrap' }}>
                    {format(parseISO(value), 'dd.MM.yyyy')}
                </span>
            )
        },
    },
]

const CustomDrawerTable = () => {
    const data = useMemo(() => {
        let result: IReview[] = []
        for (let i = 1; i < 6; i++) {
            result.push({
                id: i,
                key: i,
                product: `Product ${i} with random name`,
                review: 'I like it',
                date: '2022-08-24T02:00:00.728Z',
            })
        }
        return result
    }, [])

    const scrollX = useMemo(() => {
        return columns.reduce((acc, column) => {
            const width = Number(column.width)
            return isNaN(width) ? acc + 200 : acc + width
        }, 0)
    }, [columns])

    return (
        <Table
            dataSource={data}
            rowKey="id"
            columns={columns}
            scroll={{
                x: scrollX,
            }}
            sticky
            size="small"
            pagination={false}
        />
    )
}

export default CustomDrawerTable
