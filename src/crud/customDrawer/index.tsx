import React, { useCallback, useState } from 'react'
import { FiEye } from 'react-icons/fi'
import { IUser } from '../../mocks/data/users'
import { createCRUD, Button, Typography, Drawer, Tabs, EditAction } from '../../../admiral'
import Table from './Table'
import InfoTab from './InfoTab'
import { tableColumns } from './tableColumns'
import { filterFields } from './filterFields'
import { createFields } from './createFields'
import { editFields } from './editFields'

export const path = '/crud-with-custom-drawer'
export const resource = 'users'

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
            render: (_value, record: IUser) => {
                const [visible, show, close] = useDrawer()
                return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            onClick={show}
                            type="button"
                            view="clear"
                            size="S"
                            iconRight={<FiEye />}
                        />
                        <Drawer
                            visible={visible}
                            onClose={close}
                            title={`View user with id #${record.id}`}
                            width={760}
                        >
                            <Tabs defaultActiveKey="1" type="card">
                                <Tabs.TabPane tab="Info" key="1">
                                    <InfoTab {...record} />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Reviews" key="2">
                                    <Table />
                                </Tabs.TabPane>
                            </Tabs>
                        </Drawer>

                        <EditAction
                            pathname={`${path}/${record.id}`}
                            behavior="backgroundRoute"
                            mainRoutePath={`${path}/:id`}
                        />
                    </div>
                )
            },
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

const useDrawer = (): [boolean, () => void, () => void] => {
    const [visible, setVisible] = useState(false)

    const show = useCallback(() => {
        setVisible(true)
    }, [])

    const close = useCallback(() => {
        setVisible(false)
    }, [])

    return [visible, show, close]
}
