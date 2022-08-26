import React from 'react'
import { FileField, TableColumnsType } from '../../../admiral'
import { IUser } from '../../mocks/data/users'

export const tableColumns: TableColumnsType<IUser> = [
    {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        width: 90,
        render: (value) => <FileField {...value} />,
    },
    {
        title: 'Name',
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
    },
    {
        title: 'Email 2',
        dataIndex: 'email',
        key: 'email 2',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address 1',
        ellipsis: true,
    },
    {
        title: 'Address 2',
        dataIndex: 'address',
        key: 'address 2',
        width: 150,
        ellipsis: true,
    },
    {
        title: 'Group',
        dataIndex: 'group',
        key: 'group',
        width: 300,
        render: (value) => (Array.isArray(value) ? value.join(', ') : value),
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        width: 150,
        ellipsis: true,
    },
    {
        title: 'Active',
        dataIndex: 'active',
        key: 'active',
        width: 150,
        render: (value) => (value ? 'Yes' : 'No'),
    },
]
