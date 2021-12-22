import { DataTable } from '@/admiral/DataTable'
import { Form, Submit } from '@/admiral/form'
import { Page, Card, CardBody } from '@/admiral/ui'
import { ColumnsType } from '@/admiral/ui/Table/interfaces'
import { Link } from 'react-router-dom'
import React from 'react'

type CRUDConfig<RecordType> = {
    path: string
    index: {
        title: string
        apiURL: string
        newButtonText: string
        tableOptions: ColumnsType<RecordType>
    }
    form: {
        fields: React.ReactNode
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
                    <Link className="btn" to={`${config.path}/create`}>
                        {config.index.newButtonText}
                    </Link>
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
                                <Link to={`${config.path}/${record.id}`}>Edit</Link>
                            ),
                            ellipsis: true,
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
                        {config.form.fields}
                        <Submit>Create</Submit>
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
                            {config.form.fields}
                            <Submit>Update</Submit>
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
