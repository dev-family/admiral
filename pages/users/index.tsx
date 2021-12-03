import React, { useState } from 'react'
import { Page, Table, Pagination } from '@/admiral/ui'
import { Link } from 'react-router-dom'
import { ColumnsType, TableProps } from '@/admiral/ui/Table/interfaces'

interface IUser {
    key: number
    name: string
    age: number
    address: string
    email: string
}

const data: IUser[] = []
for (let i = 0; i < 25; i++) {
    data.push({
        key: i,
        name: `User ${i}`,
        age: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
        address: `London Park no. ${i}`,
        email: 'test@test.com',
    })
}

const columns: ColumnsType<IUser> = [
    {
        title: 'Full Name',
        dataIndex: 'name',
        key: 'name',
        width: 200,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 200,
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 200,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address 1',
        width: 150,
        ellipsis: true,
    },
    {
        title: 'Address 2',
        dataIndex: 'address',
        key: 'address 2',
        width: 150,
    },
    {
        title: 'Address 3',
        dataIndex: 'address',
        key: 'address 3',
        width: 150,
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a>action</a>,
        ellipsis: true,
    },
]

const title = () => 'Here is title'
const footer = () => 'Here is footer'

export default () => {
    const onChange: TableProps<IUser>['onChange'] = (pagination, sorter, extra) => {
        console.log('[Change data: pagination, sorter, extra]', pagination, sorter, extra)
    }

    const [pagination, setPagination] = useState({ current: 3 })

    const onPaginationChange = (page: number) => {
        setPagination((prev) => ({ ...prev, current: page }))
    }

    return (
        <Page
            title="Users"
            actions={
                <Link className="btn" to="users/create">
                    New User
                </Link>
            }
        >
            <Table
                dataSource={data}
                columns={columns}
                title={title}
                footer={footer}
                scroll={{
                    x: 0,
                }}
                sticky
                bordered
                onChange={onChange}
                pagination={{ size: 'small', position: ['bottomCenter'] }}
            />
            <br />
            <Table
                dataSource={data}
                title={title}
                footer={footer}
                scroll={{
                    x: 0,
                }}
                sticky
                onChange={onChange}
            >
                <Table.Column<IUser> title="Full Name" dataIndex="name" key="name" width={200} />
                <Table.Column<IUser> title="Age" dataIndex="age" key="age" width={200} />
                <Table.Column<IUser>
                    title="Address 2"
                    dataIndex="address"
                    key="address 2"
                    width={150}
                />
            </Table>
            <hr />
            <br />
            <h2>Pagination</h2>
            <br />
            <h3>• Default</h3>
            <br />
            <Pagination
                current={pagination.current}
                total={250}
                onChange={onPaginationChange}
                showTotal={(total) => `Total ${total} items`}
                showTitle={false}
            />
            <br />
            <h3>• Small</h3>
            <br />
            <Pagination
                current={pagination.current}
                total={25000}
                onChange={onPaginationChange}
                showTitle={false}
                size="small"
            />
        </Page>
    )
}
