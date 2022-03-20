import { DataTable } from '@/admiral/DataTable'
import { Form } from '@/admiral/form'
import { Page, Card, CardBody, Button } from '@/admiral/ui'
import { ColumnsType } from '@/admiral/ui/Table/interfaces'
import { MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { CreateButton } from '@/admiral/actions'
import { TopToolbar } from '@/admiral/layout'
import React from 'react'

type CRUDConfig<RecordType> = {
    path: string
    actions?: React.ReactNode
    index: {
        title: string
        apiURL: string
        newButtonText: string
        tableOptions: ColumnsType<RecordType>
    }
    form: {
        create: {
            fields: React.ReactNode
        }
        edit: {
            fields: React.ReactNode
        }
    }
    create: {
        title: string
        apiURL: string
    }
    update: {
        title: (id: string) => string
        apiURL: (id: string) => string
    }
}

function makeIndexPage<RecordType extends { id: number | string } = any>(
    config: CRUDConfig<RecordType>,
) {
    return () => {
        return (
            <Page
                title={config.index.title}
                actions={
                    config.actions || (
                        <TopToolbar>
                            <CreateButton basePath={config.path}>
                                {config.index.newButtonText}
                            </CreateButton>
                        </TopToolbar>
                    )
                }
            >
                <DataTable
                    url={config.index.apiURL}
                    columns={[
                        ...config.index.tableOptions,
                        {
                            title: 'Action',
                            key: 'operation',
                            fixed: 'right',
                            width: 100,
                            render: (_value, record) => (
                                <Link to={`${config.path}/${record.id}`}>
                                    <Button view="clear" size="S" iconRight={<MdEdit />} />
                                </Link>
                            ),
                        },
                    ]}
                />
            </Page>
        )
    }
}

function makeCreatePage<RecordType>(config: CRUDConfig<RecordType>) {
    return () => (
        <Page title={config.create.title}>
            <Card>
                <CardBody>
                    <Form action={config.create.apiURL} redirect={config.path}>
                        {config.form.create.fields}

                        <Form.Footer>
                            <Link to={config.path}>
                                <Button view="secondary">Back</Button>
                            </Link>
                            <Form.Submit>Create</Form.Submit>
                        </Form.Footer>
                    </Form>
                </CardBody>
            </Card>
        </Page>
    )
}

function makeUpdatePage<RecordType>(config: CRUDConfig<RecordType>) {
    return ({ id }: { id: string }) => {
        return (
            <Page title={config.update.title(id)}>
                <Card>
                    <CardBody>
                        <Form
                            action={config.update.apiURL(id)}
                            redirect={config.path}
                            hasInitialData
                        >
                            {config.form.edit.fields}

                            <Form.Footer>
                                <Link to={config.path}>
                                    <Button view="secondary">Back</Button>
                                </Link>
                                <Form.Submit>Update</Form.Submit>
                            </Form.Footer>
                        </Form>
                    </CardBody>
                </Card>
            </Page>
        )
    }
}

export function createCRUD<RecordType extends { id: number | string } = any>(
    config: CRUDConfig<RecordType>,
) {
    return {
        IndexPage: makeIndexPage<RecordType>(config),
        CreatePage: makeCreatePage<RecordType>(config),
        UpdatePage: makeUpdatePage<RecordType>(config),
    }
}
