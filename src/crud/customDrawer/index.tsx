import { useCallback, useState } from 'react'
import { FiEye } from 'react-icons/fi'
import { IUser } from '../../mocks/data/users'
import { createCRUD, Button, Typography, Drawer, Tabs, EditAction } from '../../../admiral'
import Table from './Table'
import InfoTab from './InfoTab'
import { tableColumns } from './tableColumns'
import { filterFields } from './filterFields'
import { createFields } from './createFields'
import { editFields } from './editFields'
import PageTopContent from '../../components/PageTopContent'

export const path = '/crud-with-custom-drawer'
export const resource = 'users'

function RowActions({ record }: { record: IUser }) {
    const [visible, setVisible] = useState(false)

    const show = useCallback(() => {
        setVisible(true)
    }, [])

    const close = useCallback(() => {
        setVisible(false)
    }, [])

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={show} type="button" view="clear" size="S" iconRight={<FiEye />} />
            <Drawer
                visible={visible}
                onClose={close}
                title={`View user with id #${record.id}`}
                width={760}
            >
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    items={[
                        {
                            key: '1',
                            label: 'Info',
                            children: <InfoTab name={record.name} avatar={record.avatar} />,
                        },
                        { key: '2', label: 'Reviews', children: <Table /> },
                    ]}
                />
            </Drawer>

            <EditAction
                pathname={`${path}/${record.id}`}
                behavior="backgroundRoute"
                mainRoutePath={`${path}/:id`}
            />
        </div>
    )
}

export const CRUD = createCRUD({
    path,
    resource,
    index: {
        title: 'CRUD with custom drawer',
        newButtonText: 'Create New User',
        tableColumns,
        tableActions: {
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            width: 100,
            render: (_value, record: IUser) => <RowActions record={record} />,
        },
    },
    filter: {
        topToolbarButtonText: 'Filter',
        fields: filterFields,
    },
    form: {
        create: {
            fields: createFields,
        },
        edit: {
            fields: editFields,
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
            title="In this example, we demonstrate how to create your custom actions, such as your drawer."
            descr={
                <>
                    <Typography.Paragraph>
                        The most popular use case is entity viewer. So we've created a separate view
                        action and a completely custom drawer in which we can display any
                        information.
                    </Typography.Paragraph>
                </>
            }
            link={{
                href: 'https://github.com/dev-family/admiral/tree/master/src/crud/customDrawer',
                text: 'Code to implement the page',
            }}
        />
    ),
})
