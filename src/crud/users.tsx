import { createCRUD } from '@/admiral/crud'
import { TextInput, SelectInput } from '@/admiral/form'
import React from 'react'

export const UsersCRUD = createCRUD({
    path: '/crud-users',
    index: {
        title: 'Users CRUD',
        apiURL: '/api/users',
        newButtonText: 'Create New User',
        tableOptions: [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
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
                title: 'Group',
                dataIndex: 'group',
                key: 'group',
                width: 200,
                ellipsis: true,
                render: (value) => value.join(', '),
            },
            {
                title: 'Role',
                dataIndex: 'role',
                key: 'role',
                width: 150,
                ellipsis: true,
            },
        ],
    },
    form: {
        create: {
            fields: (
                <>
                    <TextInput label="Id" name="id" placeholder="Id" required />
                    <TextInput label="Name" name="name" placeholder="Name" />
                    <TextInput label="Email" name="email" placeholder="Email" required />
                    <TextInput
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <SelectInput
                        label="Group"
                        name="group"
                        placeholder="Choose Group"
                        required
                        mode="multiple"
                    >
                        <SelectInput.Option value="admin">Aдминистрация</SelectInput.Option>
                        <SelectInput.Option value="project_manager">
                            Проектные менеджеры
                        </SelectInput.Option>
                    </SelectInput>
                    <SelectInput label="Role" name="role" placeholder="Choose Role" required>
                        <SelectInput.Option value="accountant">Бухгалтер</SelectInput.Option>
                        <SelectInput.Option value="recruiter">Кадровик</SelectInput.Option>
                    </SelectInput>
                </>
            ),
        },
        edit: {
            fields: (
                <>
                    <TextInput label="Name" name="name" placeholder="Name" />
                    <TextInput label="Email" name="email" placeholder="Email" required />
                    <TextInput
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <SelectInput
                        label="Group"
                        name="group"
                        placeholder="Choose Group"
                        required
                        mode="multiple"
                    >
                        <SelectInput.Option value="admin">Aдминистрация</SelectInput.Option>
                        <SelectInput.Option value="project_manager">
                            Проектные менеджеры
                        </SelectInput.Option>
                    </SelectInput>
                    <SelectInput label="Role" name="role" placeholder="Choose Role" required>
                        <SelectInput.Option value="accountant">Бухгалтер</SelectInput.Option>
                        <SelectInput.Option value="recruiter">Кадровик</SelectInput.Option>
                    </SelectInput>
                </>
            ),
        },
    },
    create: {
        title: 'Create New User',
        apiURL: '/api/users/create',
    },
    update: {
        title: (id: string) => `Edit User #${id}`,
        apiURL: (id: string) => `/api/users/${id}`,
    },
})
