import React from 'react'
import { FiGift, FiInfo } from 'react-icons/fi'
import {
    createCRUD,
    TopToolbar,
    FilterButton,
    CreateButton,
    TextInput,
    SelectInput,
    FilePictureInput,
    FileField,
    BooleanInput,
    Button,
    Typography,
    DatePickerInput,
} from '../../admiral'
import PageTopContent from '../components/PageTopContent'

export const BaseCRUD = createCRUD({
    path: '/quick-filters',
    resource: 'users',
    actions: (
        <TopToolbar>
            <FilterButton>Filter</FilterButton>
            <CreateButton basePath="/quick-filters">Create New User</CreateButton>
        </TopToolbar>
    ),
    index: {
        title: 'Quick Filters',
        newButtonText: 'Create New User',
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
                title: 'Email 2',
                dataIndex: 'email',
                key: 'email 2',
            },
            {
                title: 'Registered at',
                dataIndex: 'registered_at',
                key: 'registered_at',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address 1',
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
    },
    filter: {
        topToolbarButtonText: 'Filter',
        fields: (
            <>
                <TextInput name="search" label="Search" type="search" placeholder="Search" />
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
                <DatePickerInput
                    name="registered_at"
                    label="Registered at"
                    placeholder="Registered at"
                    allowClear
                />
                <SelectInput label="Role" name="role" placeholder="Choose Role" allowClear>
                    <SelectInput.Option value="accountant">Accountant</SelectInput.Option>
                    <SelectInput.Option value="recruiter">Recruiter</SelectInput.Option>
                </SelectInput>
                <BooleanInput label="Active" name="active" />
            </>
        ),
        quickFilters: ['group', 'search', 'role', 'registered_at', 'active'],
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
                        <SelectInput.Option value="admin">Administration</SelectInput.Option>
                        <SelectInput.Option value="project_manager">
                            Project managers
                        </SelectInput.Option>
                    </SelectInput>
                    <SelectInput label="Role" name="role" placeholder="Choose Role" required>
                        <SelectInput.Option value="accountant">Accountant</SelectInput.Option>
                        <SelectInput.Option value="recruiter">HR Officer</SelectInput.Option>
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
                        <SelectInput.Option value="admin">Administration</SelectInput.Option>
                        <SelectInput.Option value="project_manager">
                            Project managers
                        </SelectInput.Option>
                    </SelectInput>
                    <SelectInput label="Role" name="role" placeholder="Choose Role" required>
                        <SelectInput.Option value="accountant">Accountant</SelectInput.Option>
                        <SelectInput.Option value="recruiter">HR Officer</SelectInput.Option>
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
        view: 'drawer',
    },
    topContent: (
        <PageTopContent
            title="In this example, we demonstrate how to create quick filter above the table."
            descr={
                <>
                    <Typography.Paragraph>
                        You can use quick filters instead of basic filters in drawer.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        Or use filters in both places: drawer and above the table.
                    </Typography.Paragraph>
                </>
            }
            link={{
                href: 'https://github.com/dev-family/admiral/blob/master/src/crud/quickFilters.tsx',
                text: 'Code to implement the page',
            }}
        />
    ),
})
