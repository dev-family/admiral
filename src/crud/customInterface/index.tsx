import React, { useCallback } from 'react'
import { createCRUD, Typography, useDataProvider } from '../../../admiral'
import ThemePage from './ThemePage'

export const path = '/custom-interface'
export const resource = 'themes'

export const CRUD = createCRUD({
    path,
    resource,
    index: {
        title: 'Custom Interface',
        newButtonText: 'Create new theme',
        tableColumns: [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 90,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
        ],
    },
    form: {
        create: {
            fields: null,
        },
        edit: {
            fields: null,
        },
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

export function CreatePage() {
    const { create } = useDataProvider()

    const submitData = useCallback((values) => {
        return create(resource, { data: values })
    }, [])

    return <ThemePage path={path} title="Create new theme" submitData={submitData} />
}

export function UpdatePage({ id }: { id: string }) {
    const { getUpdateFormData, update } = useDataProvider()

    const fetchInitialData = useCallback(() => {
        return getUpdateFormData(resource, { id })
    }, [])

    const submitData = useCallback((values) => {
        return update(resource, { data: values, id })
    }, [])

    return (
        <ThemePage
            path={path}
            title={`Edit theme #${id}`}
            fetchInitialData={fetchInitialData}
            submitData={submitData}
        />
    )
}
