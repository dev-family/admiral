import { DataTable } from '../dataTable'
import { Form, FormProps } from '../form'
import { Page, Button, Drawer } from '../ui'
import { FiTrash, FiEdit3, FiX, FiSave } from 'react-icons/fi'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { CreateButton, BackButton, FilterButton } from '../actions'
import { TopToolbar } from '../layout'
import { useDataProvider } from '../dataProvider'
import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react'
import { useDataTable } from '../dataTable/DataTableContext'
import { CrudIndexPageContextProvider } from './CrudIndexPageContext'
import { AppliedFilters, Filters } from '../filters'
import { RouterLocationState } from '../router/interfaces'
import { CRUDConfig } from './interfaces'
import styles from './Crud.module.scss'
import { PopupContainerContextProvider } from './PopupContainerContext'
import { enUS as enUsActionsLocale } from './locale/actions'

const operationsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '2px',
    flexWrap: 'wrap',
}

function makeIndexPage<RecordType extends { id: number | string } = any>(
    config: CRUDConfig<RecordType>,
) {
    return () => {
        const { deleteOne, getFiltersFormData } = useDataProvider()
        const fetchInitialFiltersData = useCallback(() => {
            return getFiltersFormData(config.resource)
        }, [])
        const { dndRows } = config.table || {}
        const { view, drawer } = config.update
        const routePath = drawer?.routePath ?? ((path) => `${path}/:id`)

        let location = useLocation<RouterLocationState>()

        return (
            <CrudIndexPageContextProvider filterFields={config.filter?.fields}>
                <Page
                    title={config.index.title}
                    actions={
                        config.actions || (
                            <TopToolbar>
                                {!!config.filter && (
                                    <FilterButton>{config.index.filterButtonText}</FilterButton>
                                )}
                                <CreateButton basePath={config.path}>
                                    {config.index.newButtonText}
                                </CreateButton>
                            </TopToolbar>
                        )
                    }
                >
                    <AppliedFilters />
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
                                    const { refresh } = useDataTable()
                                    const handleDelete = useCallback(async () => {
                                        await deleteOne(config.resource, { id: record.id })
                                        refresh()
                                    }, [])

                                    return (
                                        <div style={operationsStyle}>
                                            <Link
                                                to={{
                                                    pathname: `${config.path}/${record.id}`,
                                                    ...(view === 'drawer' && {
                                                        state: {
                                                            background: location,
                                                            routeWithBackground: routePath(
                                                                config.path,
                                                            ),
                                                            scrollTop: false,
                                                        },
                                                    }),
                                                }}
                                            >
                                                <Button
                                                    view="clear"
                                                    size="S"
                                                    iconRight={<FiEdit3 />}
                                                />
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
                        dndRows={dndRows}
                    />
                    {!!config.filter && (
                        <Filters
                            fetchInitialData={fetchInitialFiltersData}
                            locale={config.locale?.filters}
                        >
                            {config.filter.fields}
                        </Filters>
                    )}
                </Page>
            </CrudIndexPageContextProvider>
        )
    }
}

function makeCreatePage<RecordType>(config: CRUDConfig<RecordType>) {
    return () => {
        const { getCreateFormData, create } = useDataProvider()

        const fetchInitialData = useCallback(() => {
            return getCreateFormData(config.resource)
        }, [])

        const submitData = useCallback((values) => {
            return create(config.resource, { data: values })
        }, [])

        const actionsLocale = config.locale?.actions ?? enUsActionsLocale

        return (
            <Page title={config.create.title}>
                <Form
                    submitData={submitData}
                    redirect={config.path}
                    fetchInitialData={fetchInitialData}
                    locale={config.locale?.form}
                >
                    <Form.Fields>{config.form.create.fields}</Form.Fields>

                    <Form.Footer>
                        <BackButton basePath={config.path}>{actionsLocale.back}</BackButton>
                        <Form.Submit>{actionsLocale.submit}</Form.Submit>
                    </Form.Footer>
                </Form>
            </Page>
        )
    }
}

function makeUpdatePage<RecordType>(config: CRUDConfig<RecordType>) {
    return ({ id }: { id: string }) => {
        const { getUpdateFormData, update } = useDataProvider()

        const fetchInitialData = useCallback(() => {
            return getUpdateFormData(config.resource, { id })
        }, [])

        const submitData = useCallback((values) => {
            return update(config.resource, { data: values, id })
        }, [])

        const actionsLocale = config.locale?.actions ?? enUsActionsLocale

        const {
            update: { title, view = 'page' },
            path,
            locale,
            form: {
                edit: { fields },
            },
        } = config

        const { state } = useLocation<RouterLocationState>()
        const background = state && state.background

        return view === 'drawer' && !!background ? (
            <UpdateDrawer
                config={config}
                title={title(id)}
                fetchInitialData={fetchInitialData}
                submitData={submitData}
            />
        ) : (
            <Page title={title(id)}>
                <Form
                    redirect={path}
                    submitData={submitData}
                    fetchInitialData={fetchInitialData}
                    locale={locale?.form}
                >
                    <Form.Fields>{fields}</Form.Fields>

                    <Form.Footer>
                        <BackButton basePath={path}>{actionsLocale.back}</BackButton>
                        <Form.Submit>{actionsLocale.submit}</Form.Submit>
                    </Form.Footer>
                </Form>
            </Page>
        )
    }
}

function UpdateDrawer<RecordType>({
    config,
    title,
    fetchInitialData,
    submitData,
}: {
    config: CRUDConfig<RecordType>
    title: string
    fetchInitialData: FormProps['fetchInitialData']
    submitData: FormProps['submitData']
}) {
    const drawerRef = useRef<React.ElementRef<typeof Drawer>>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(true)
        return () => setVisible(false)
    }, [])

    const history = useHistory()

    const formRef = useRef<React.ElementRef<typeof Form>>(null)
    const actionsLocale = config.locale?.actions ?? enUsActionsLocale

    const {
        update: { drawer },
        path,
        locale,
        form: {
            edit: { fields },
        },
    } = config

    const onBack = useCallback(() => {
        setVisible(false)
    }, [])

    const onSubmit = useCallback(async () => {
        await formRef.current?.handleSubmit()
        setVisible(false)
    }, [formRef])

    const popupContainer = useMemo(
        () =>
            drawerRef.current?.bodyElement ??
            (() => document.querySelector('#root > .Theme') as HTMLElement),
        [drawerRef.current],
    )

    return (
        <Drawer
            ref={drawerRef}
            visible={visible}
            onClose={(e) => {
                e.stopPropagation()
                setVisible(false)
            }}
            title={title}
            footer={
                <div className={styles.drawerFooter}>
                    <Button type="button" view="secondary" onClick={onBack} iconLeft={<FiX />}>
                        {actionsLocale.back}
                    </Button>
                    <Button type="button" onClick={onSubmit} iconLeft={<FiSave />}>
                        {actionsLocale.submit}
                    </Button>
                </div>
            }
            afterVisibleChange={(visible) => {
                if (!visible) {
                    history.push({
                        pathname: path,
                        // update table when drawer saved and closed
                        state: { update: { dataTable: false }, scrollTop: false },
                    })
                }
            }}
            width={drawer?.width ?? 900}
        >
            <PopupContainerContextProvider value={popupContainer}>
                <Form
                    ref={formRef}
                    submitData={submitData}
                    fetchInitialData={fetchInitialData}
                    locale={locale?.form}
                >
                    <Form.Fields>{fields}</Form.Fields>
                </Form>
            </PopupContainerContextProvider>
        </Drawer>
    )
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
