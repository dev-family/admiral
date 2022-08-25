import React from 'react'
import {
    createCRUD,
    TextInput,
    SelectInput,
    FilePictureInput,
    FileField,
    BooleanInput,
    Button,
    Typography,
} from '../../admiral'

export const CRUD = createCRUD({
    path: '/bulk-actions',
    resource: 'users',
    index: {
        title: 'Bulk Actions',
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
        ],
        tableConfig: {
            rowSelection: {
                render: (selectedRowKeys) => <RowSelection selectedKeys={selectedRowKeys} />,
            },
        },
        tableActions: null,
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
    },
    create: {
        title: 'Create New User',
    },
    update: {
        title: (id: string) => `Edit User #${id}`,
    },
    topContent: <PageTopContent />,
})

function PageTopContent() {
    return (
        <Typography>
            <Typography.Title level={2}>Introduction</Typography.Title>
            <Typography.Paragraph>
                Блок текста сначала, где я буду расписывать сценарии и вводное слово, что на этой
                странице. Все на английском.
            </Typography.Paragraph>
        </Typography>
    )
}

function RowSelection({ selectedKeys }: { selectedKeys: Array<string | number> }) {
    const btnDisabled = selectedKeys.length === 0
    selectedKeys.length === 0

    const onClick = (action: string) => () =>
        alert(`${action} selected items with keys: ${selectedKeys.join(', ')}`)

    return (
        <div style={{ display: 'flex', gap: 'var(--space-m)' }}>
            <Button size="S" type="button" disabled={btnDisabled} onClick={onClick('Edit')}>
                Edit
            </Button>
            <Button size="S" type="button" disabled={btnDisabled} onClick={onClick('Delete')}>
                Delete
            </Button>
        </div>
    )
}
