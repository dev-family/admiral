import { createCRUD, TextInput, PasswordInput, SelectInput } from '@devfamily/admiral'
import React from 'react'

export const CRUD = createCRUD({
    path: '/users',
    resource: 'users',
    index: {
        title: 'Users',
        newButtonText: 'Add',
        tableColumns: [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 90,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Role',
                dataIndex: 'role',
                key: 'role',
            },
        ],
    },
    form: {
        create: {
            fields: (
                <>
                    <TextInput label="Name" name="name" placeholder="Name" required />
                    <TextInput label="Email" name="email" placeholder="Email" required />
                    <PasswordInput
                        label="Password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <SelectInput
                        label="Role"
                        name="role"
                        placeholder="Role"
                        required
                        options={[
                            { label: 'Admin', value: 'admin' },
                            { label: 'User', value: 'user' },
                        ]}
                    />
                </>
            ),
        },
        edit: {
            fields: (
                <>
                    <TextInput label="Name" name="name" placeholder="Name" required />
                    <TextInput label="Email" name="email" placeholder="Email" required />
                    <PasswordInput
                        label="Password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <SelectInput
                        label="Role"
                        name="role"
                        placeholder="Role"
                        required
                        options={[
                            { label: 'Admin', value: 'admin' },
                            { label: 'User', value: 'user' },
                        ]}
                    />
                </>
            ),
        },
    },
    create: {
        title: 'Create User',
    },
    update: {
        title: (id: string) => `Edit User #${id}`,
    },
})
