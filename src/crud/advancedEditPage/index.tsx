import React from 'react'
import {
    createCRUD,
    TextInput,
    SelectInput,
    FilePictureInput,
    FileField,
    BooleanInput,
} from '../../../admiral'
import OrdersLinkField from './OrdersLinkField'
import PageTopContent from './PageTopContent'
import StatusField from './StatusField'

export const path = '/advanced-edit-page'
export const resource = 'users'

export const CRUD = createCRUD({
    path,
    resource,
    index: {
        title: 'Advanced Edit Page',
        newButtonText: 'Create New User',
        filterButtonText: 'Filter',
        tableColumns: [
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
                title: 'Status',
                dataIndex: 'active',
                key: 'active',
                width: 140,
                render: (value, record) => (
                    <StatusField resource={resource} id={record.id} value={value} />
                ),
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
                title: 'Orders',
                dataIndex: 'orders',
                key: 'orders',
                width: 150,
                ellipsis: true,
                render: (_, record) => <OrdersLinkField href={`${path}/${record.id}`} />,
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
        ],
        tableConfig: {
            title: () => 'Custom header here. 8 users, 4 golden users, 2 blocked users.',
            footer: () => 'Custom footer here.',
        },
    },
    filter: {
        fields: (
            <>
                <TextInput label="Name" name="name" placeholder="Name" />
                <SelectInput
                    label="Group (multiselect)"
                    name="group"
                    placeholder="Choose Group"
                    mode="multiple"
                >
                    <SelectInput.Option value="admin">Admins</SelectInput.Option>
                    <SelectInput.Option value="project_manager">
                        Project Managers
                    </SelectInput.Option>
                </SelectInput>
                <SelectInput label="Role" name="role" placeholder="Choose Role" allowClear>
                    <SelectInput.Option value="accountant">Accountant</SelectInput.Option>
                    <SelectInput.Option value="recruiter">Recruiter</SelectInput.Option>
                </SelectInput>
                <BooleanInput label="Active?" name="active" />
            </>
        ),
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
                        label="Group (multiselect)"
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
                    <FilePictureInput
                        columnSpan={2}
                        label="Avatar"
                        name="avatar"
                        accept="image/*"
                        maxCount={1}
                    />
                    <BooleanInput label="Active?" name="active" />
                </>
            ),
        },
        edit: {
            fields: null,
        },
    },
    create: {
        title: 'Create New User',
    },
    update: {
        title: (id: string) => `Edit User #${id}`,
    },
    topContent: <PageTopContent />,
})
