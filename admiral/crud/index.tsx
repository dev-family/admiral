import { DataTable, DataTableProps } from '@/admiral/datatable'
import { Form, Submit } from '@/admiral/form'
import { Page, Card, CardBody } from '@/admiral/ui'
import { Link } from 'react-router-dom'
import React from 'react'

type CRUDConfig = {
    path: string
    index: {
        title: string
        apiURL: string
        newButtonText: string
        tableOptions: DataTableProps['options']
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

function makeIndexPage(config: CRUDConfig) {
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
                    options={[
                        ...config.index.tableOptions,
                        {
                            label: 'Actions',
                            align: 'right',
                            render({ id }) {
                                return (
                                    <Link
                                        className="btn btn-primary btn-sm"
                                        to={`${config.path}/${id}`}
                                    >
                                        Edit
                                    </Link>
                                )
                            },
                        },
                    ]}
                />
            </Page>
        )
    }
}

function makeCreatePage(config: CRUDConfig) {
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

function makeUpdatePage(config: CRUDConfig) {
    return ({ id }: { id: string }) => (
        <Page title={config.update.title(id)}>
            <Card>
                <CardBody>
                    <Form action={config.update.apiURL(id)} redirect={config.path} hasInitialData>
                        {config.form.fields}
                        <Submit>Update</Submit>
                    </Form>
                </CardBody>
            </Card>
        </Page>
    )
}

export function createCRUD(config: CRUDConfig) {
    return {
        IndexPage: makeIndexPage(config),
        CreatePage: makeCreatePage(config),
        UpdatePage: makeUpdatePage(config),
    }
}
