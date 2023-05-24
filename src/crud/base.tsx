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
} from '../../admiral'
import PageTopContent from '../components/PageTopContent'

export const BaseCRUD = createCRUD({
    path: '/base-crud',
    resource: 'users',
    actions: (
        <TopToolbar>
            <FilterButton>Filter</FilterButton>
            <CreateButton basePath="/base-crud">Create New User</CreateButton>
            <Button
                type="button"
                view="secondary"
                onClick={() => alert('Custom action')}
                iconRight={<FiGift />}
            >
                Custom action
            </Button>
        </TopToolbar>
    ),
    index: {
        title: 'Base CRUD',
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
            title: () => 'Custom header here. 8 users, 4 golden users, 2 blocked users.',
            footer: () => 'Custom footer here.',
        },
    },
    filter: {
        topToolbarButtonText: 'Filter',
        fields: (
            <>
                <TextInput label="Search" name="search" placeholder="Seach" type="search" />
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
            title="A basic CRUD that is most often used in projects."
            descr={
                <>
                    <Typography.Paragraph>
                        The table displays data from different types of fields, including images and
                        pagination.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        The table may have an additional description in the header and footer.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        Different types of fields are represented in the filter.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        It is possible to add a custom button that will perform the action you want,
                        such as running synchronization, background processes.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        The form is represented by the most popular fields.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        Entity creation page opens on a separate page.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        The edit page opens in the drawer for easy access and has the same set of
                        fields as the entity creation page.
                    </Typography.Paragraph>
                </>
            }
            link={{
                href: 'https://github.com/dev-family/admiral/blob/master/src/crud/base.tsx',
                text: 'Code to implement the page',
            }}
        />
    ),
})
