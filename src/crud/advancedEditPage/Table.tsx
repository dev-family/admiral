import React, { useMemo } from 'react'
import { FiEye } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Table, Button, TableColumnsType } from '../../../admiral'
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'

export interface IOrder {
    id: number | string
    key: number | string
    name: string
    sum: string
    date: string
}

const actionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '2px',
    flexWrap: 'wrap',
    justifyContent: 'center',
}

const columns: TableColumnsType<IOrder> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Sum',
        dataIndex: 'sum',
        key: 'sum',
        width: 170,
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: 200,
        render: (value) => {
            return (
                <span style={{ whiteSpace: 'nowrap' }}>
                    {format(parseISO(value), 'dd.MM.yyyy')}
                </span>
            )
        },
    },
    {
        title: 'Actions',
        key: 'actions',
        fixed: 'right',
        width: 100,
        render: () => {
            return (
                <div style={actionsStyle}>
                    <Link to="#">
                        <Button type="button" view="clear" size="S" iconRight={<FiEye />} />
                    </Link>
                </div>
            )
        },
    },
]

const EditPageTable = () => {
    const data = useMemo(() => {
        let result: IOrder[] = []
        for (let i = 1; i < 6; i++) {
            result.push({
                id: i,
                key: i,
                name: `Order ${i}`,
                sum: `${Math.floor(Math.random() * (1000 - 1 + 1)) + 1} $`,
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
            pagination={false}
        />
    )
}

export default EditPageTable
