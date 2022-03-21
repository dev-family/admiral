import { DataTable } from '@/admiral/DataTable'
import { Form } from '@/admiral/form'
import { Page, Card, CardBody, Button } from '@/admiral/ui'
import { ColumnsType } from '@/admiral/ui/Table/interfaces'
import { FiTrash, FiEdit3 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { CreateButton } from '@/admiral/actions'
import { TopToolbar } from '@/admiral/layout'
import { useDataProvider } from '@/admiral/dataProvider'
import React, { useCallback } from 'react'

const operationsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '2px',
    flexWrap: 'wrap',
}

type CRUDConfig<RecordType> = {
    path: string
    actions?: React.ReactNode
    resource: string
    index: {
        title: string
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
    }
    update: {
        title: (id: string) => string
    }
}

function makeIndexPage<RecordType extends { id: number | string } = any>(
    config: CRUDConfig<RecordType>,
) {
    return () => {
        const { deleteOne } = useDataProvider()
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
                    resource={config.resource}
                    columns={[
                        ...config.index.tableOptions,
                        {
                            title: 'Действия',
                            key: 'operation',
                            fixed: 'right',
                            width: 120,
                            render: (_value, record) => {
                                const handleDelete = useCallback(() => {
                                    return deleteOne(config.resource, { id: record.id })
                                }, [])

                                return (
                                    <div style={operationsStyle}>
                                        <Link to={`${config.path}/${record.id}`}>
                                            <Button view="clear" size="S" iconRight={<FiEdit3 />} />
                                        </Link>

                                        <Button
                                            onClick={handleDelete}
                                            view="clear"
                                            size="S"
                                            iconRight={<FiTrash />}
                                        />
                                    </div>
                                )
                            },
                        },
                    ]}
                />
            </Page>
        )
    }
}

function makeCreatePage<RecordType>(config: CRUDConfig<RecordType>) {
    return () => {
        const { create } = useDataProvider()

        const submitData = useCallback((values) => {
            return create(config.resource, { data: values })
        }, [])

        return (
            <Page title={config.create.title}>
                <Card>
                    <CardBody>
                        <Form submitData={submitData} redirect={config.path}>
                            <Form.Fields>{config.form.create.fields}</Form.Fields>

                            <Form.Footer>
                                <Link to={config.path}>
                                    <Button view="secondary">Назад</Button>
                                </Link>
                                <Form.Submit>Сохранить</Form.Submit>
                            </Form.Footer>
                        </Form>
                    </CardBody>
                </Card>
            </Page>
        )
    }
}

function makeUpdatePage<RecordType>(config: CRUDConfig<RecordType>) {
    return ({ id }: { id: string }) => {
        const { getOne, update } = useDataProvider()

        const fetchInitialData = useCallback(() => {
            return getOne(config.resource, { id })
        }, [])

        const submitData = useCallback((values) => {
            return update(config.resource, { data: values, id })
        }, [])

        return (
            <Page title={config.update.title(id)}>
                <Card>
                    <CardBody>
                        <Form
                            redirect={config.path}
                            submitData={submitData}
                            fetchInitialData={fetchInitialData}
                        >
                            <Form.Fields>{config.form.edit.fields}</Form.Fields>

                            <Form.Footer>
                                <Link to={config.path}>
                                    <Button view="secondary">Назад</Button>
                                </Link>
                                <Form.Submit>Сохранить</Form.Submit>
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
