import { Page, Table } from '@/admiral/ui'
import { Link } from 'react-router-dom'
import { ColumnsType } from '@/admiral/ui/Table/interfaces'
import React from 'react'

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
        age: 32,
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
            >
                <Table.Column title="Full Name" dataIndex="name" key="name" width={200} />
                <Table.Column title="Age" dataIndex="age" key="age" width={200} />
                <Table.Column title="Address 2" dataIndex="address" key="address 2" width={150} />
            </Table>
        </Page>
    )
}
