import { createCRUD } from '../../admiral/crud'
import { Input } from '../../admiral/form'
import React from 'react'

export const UsersCRUD = createCRUD({
    path: '/crud-users',
    index: {
        title: 'Users CRUD',
        apiURL: 'http://localhost/api/users',
        newButtonText: 'Create New User',
        tableOptions: [
            {
                label: '#',
                dataKey: 'id',
            },
            {
                label: 'Name',
                dataKey: 'name',
            },
            {
                label: 'Email',
                dataKey: 'email',
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
        apiURL: 'http://localhost/api/users',
    },
    update: {
        title: (id: string) => `Edit User #${id}`,
        apiURL: (id: string) => `http://localhost/api/users/${id}`,
    },
})
