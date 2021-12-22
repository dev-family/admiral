import { createCRUD } from '@/admiral/crud'
import { Input } from '@/admiral/form'
import React from 'react'

export const UsersCRUD = createCRUD({
    path: '/crud-users',
    index: {
        title: 'Users CRUD',
        apiURL: '/api/users',
        newButtonText: 'Create New User',
        tableOptions: [
            {
                title: 'Full Name',
                dataIndex: 'name',
                key: 'name',
                width: 200,
                sorter: true,
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                width: 200,
                sorter: true,
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
        ],
    },
    form: {
        fields: (
            <>
                <Input name="name" label="Name" required />
                <Input name="email" label="Email" required />
                <Input type="password" name="password" label="Password" required />
            </>
        ),
    },
    create: {
        title: 'Create New User',
        apiURL: '/api/users',
    },
    update: {
        title: (id: string) => `Edit User #${id}`,
        apiURL: (id: string) => `/api/users/${id}`,
    },
})
