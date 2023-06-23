import React from 'react'
import {
    createCRUD,
    TextInput,
    SelectInput,
    FilePictureInput,
    FileField,
    BooleanInput,
    TopToolbar,
    FilterButton,
    CreateButton,
    Typography,
} from '../../../admiral'
import PageTopContent from '../../components/PageTopContent'
import OrdersLinkField from './OrdersLinkField'
import StatusField from './StatusField'

export const path = '/advanced-edit-page'
export const resource = 'users'

export const CRUD = createCRUD({
    path,
    resource,
    actions: (
        <TopToolbar>
            <FilterButton>Filters</FilterButton>
            <CreateButton basePath={path}>Create New User</CreateButton>
        </TopToolbar>
    ),
    index: {
        title: 'Advanced Edit Page',
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
            autoupdateTime: 7000,
        },
    },
    filter: {
        topToolbarButtonText: 'Filter',
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
            fields: null,
        },
    },
    create: {
        title: 'Create New User',
    },
    topContent: (
        <PageTopContent
            title="Unlike base crud, here we've expanded the functionality of the table."
            descr={
                <>
                    <Typography.Paragraph>
                        Now it has select right in it. For example, you can change order status
                        directly from the table, and we've added a link that leads to the associated
                        entity.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        In this example, we've made a separate view for the edit page, and it's
                        different from the create page.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        On the example edit page, we've added tabs that you can use entirely for
                        your functionality. As an example, we left the edit form in the first tab.
                        In the second tab we've output a table which can be used to display related
                        entities, e.g., the composition of the order in the online store. And in the
                        third tab we showed that the page is easy to customize and use as you like.
                    </Typography.Paragraph>
                </>
            }
            link={{
                href: 'https://github.com/dev-family/admiral/tree/master/src/crud/advancedEditPage ',
                text: 'Code to implement the page',
            }}
        />
    ),
})
