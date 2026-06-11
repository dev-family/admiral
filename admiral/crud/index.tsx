import { DataTable } from '../dataTable'
import { Form, FormProps } from '../form'
import { Page, Button, Drawer } from '../ui'
import { FiX, FiSave } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { getPopupContainer } from '../utils/helpers'
import { CreateButton, BackButton, FilterButton } from '../actions'
import { TopToolbar } from '../layout'
import { useDataProvider } from '../dataProvider'
import React, { useCallback, useState, useEffect, useRef, useMemo, type RefCallback } from 'react'
import { CrudIndexPageContextProvider } from './CrudIndexPageContext'
import { AppliedFilters, Filters } from '../filters'
import useTypedLocation from '../router/useTypedLocation'
import { CRUDConfig } from './interfaces'
import styles from './Crud.module.scss'
import { PopupContainerContextProvider } from './PopupContainerContext'
import { ColumnType } from '../ui/Table/interfaces'
import { DeleteAction, EditAction } from '../dataTable/actions'
import { useLocaleProvider } from '../locale'
import QuickFiltersWrapper from '../filters/QuickFiltersWrapper'

const operationsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '2px',
    flexWrap: 'wrap',
}

function makeIndexPage<RecordType extends { id: number | string } = any>(
    config: CRUDConfig<RecordType>,
) {
    return () => {
        const { getFiltersFormData } = useDataProvider()
        const locale = useLocaleProvider()
        const fetchInitialFiltersData = useCallback(
            (urlState?: Record<string, any>) => {
                return getFiltersFormData(config.resource, urlState)
            },
            [getFiltersFormData],
        )
        const { view, drawer } = config.update || {}
        const routePath = drawer?.routePath ?? ((path) => `${path}/:id`)
        const actionsLocale = locale.actions
        const tableLocale = locale.table
        const paginationLocale = {
            ...(locale?.pagination ?? {}),
            total: actionsLocale.paginationTotal,
        }
        const tableActions = config.index.tableActions

        const tableActionsDefault: ColumnType<RecordType> = {
            title: actionsLocale.tableColumn,
            key: 'operation',
            fixed: 'right',
            width: 120,
            render: (_value, record) => {
                return (
                    <div style={operationsStyle}>
                        <EditAction
                            pathname={`${config.path}/${record.id}`}
                            {...(view === 'drawer' && {
                                behavior: 'backgroundRoute',
                                mainRoutePath: routePath(config.path),
                            })}
                        />
                        <DeleteAction
                            resource={config.resource}
                            id={record.id}
                            locale={locale?.popconfirm}
                        />
                    </div>
                )
            },
        }

        return (
            <CrudIndexPageContextProvider filterFields={config.filter?.fields}>
                <Page
                    title={config.index.title}
                    actions={
                        config.actions || (
                            <TopToolbar>
                                {!!config.filter && (
                                    <FilterButton>
                                        {config.filter.topToolbarButtonText}
                                    </FilterButton>
                                )}
                                <CreateButton basePath={config.path}>
                                    {config.index.newButtonText}
                                </CreateButton>
                            </TopToolbar>
                        )
                    }
                    topContent={config.topContent}
                >
                    {!!config.filter && (
                        <>
                            <QuickFiltersWrapper filters={config.filter?.quickFilters} />
                            <AppliedFilters />
                        </>
                    )}

                    <DataTable
                        resource={config.resource}
                        columns={[
                            ...config.index.tableColumns,
                            ...(tableActions === null
                                ? []
                                : tableActions
                                  ? [tableActions]
                                  : [tableActionsDefault]),
                        ]}
                        config={config.index.tableConfig}
                        locale={{ table: tableLocale, pagination: paginationLocale }}
                        autoupdateTime={config.index.tableConfig?.autoupdateTime}
                    />
                    {!!config.filter && (
                        <Filters
                            fetchInitialData={fetchInitialFiltersData}
                            locale={{ filters: locale.filters, form: locale.form }}
                        >
                            {config.filter.fields}
                        </Filters>
                    )}
                    {config.bottomContent}
                </Page>
            </CrudIndexPageContextProvider>
        )
    }
}

function makeCreatePage<RecordType>(config: CRUDConfig<RecordType>) {
    return () => {
        const locale = useLocaleProvider()
        const title = config.create?.title ?? 'Create'

        const actionsLocale = locale.actions

        const {
            path,
            form: {
                create: { fields, children },
            },
        } = config

        useEffect(() => {
            if (config.form.create.fields && config.form.create.children) {
                console.error(
                    '[Admiral] Provide either "form.create.fields" or "form.create.children", not both',
                )
            }
            if (!config.form.create.fields && !config.form.create.children) {
                console.error('[Admiral] Provide "form.create.fields" or "form.create.children"')
            }
            if (!config.form.create.fields && !config.create?.title) {
                console.error('[Admiral] Please provide "create.title"')
            }
        }, [])

        const { getCreateFormData, create } = useDataProvider()

        const fetchInitialData = useCallback(() => {
            return getCreateFormData(config.resource)
        }, [getCreateFormData])

        const submitData = useCallback(
            (values: any) => {
                return create(config.resource, { data: values })
            },
            [create],
        )

        const pageFormChildren = useMemo(
            () =>
                children ?? (
                    <>
                        <Form.Fields>{fields}</Form.Fields>

                        <Form.Footer>
                            <BackButton basePath={path}>{actionsLocale.back}</BackButton>
                            <Form.Submit>{actionsLocale.submit}</Form.Submit>
                        </Form.Footer>
                    </>
                ),
            [children, fields, path, actionsLocale],
        )

        return (
            <Page title={title}>
                <Form
                    submitData={submitData}
                    redirect={config.path}
                    fetchInitialData={fetchInitialData}
                    locale={locale.form}
                >
                    {pageFormChildren}
                </Form>
            </Page>
        )
    }
}

function makeUpdatePage<RecordType>(config: CRUDConfig<RecordType>) {
    return ({ id }: { id: string }) => {
        const { getUpdateFormData, update } = useDataProvider()
        const locale = useLocaleProvider()

        const fetchInitialData = useCallback(() => {
            return getUpdateFormData(config.resource, { id })
        }, [getUpdateFormData, id])

        const submitData = useCallback(
            (values: any) => {
                return update(config.resource, { data: values, id })
            },
            [update, id],
        )

        const actionsLocale = locale.actions

        const {
            path,
            form: {
                edit: { fields, children },
            },
        } = config
        const { title = (id: string) => `Update #${id}`, view = 'page' } = config.update || {}

        useEffect(() => {
            if (config.form.edit.fields && config.form.edit.children) {
                console.error(
                    '[Admiral] Provide either "form.edit.fields" or "form.edit.children", not both',
                )
            }
            if (!config.form.edit.fields && !config.form.edit.children) {
                console.error('[Admiral] Provide "form.edit.fields" or "form.edit.children"')
            }
            if (!config.form.edit.fields && !config.update?.title) {
                console.error('[Admiral] Please provide "update.title"')
            }
        }, [])

        const pageFormChildren = useMemo(() => {
            return children ? (
                children
            ) : (
                <>
                    <Form.Fields>{fields}</Form.Fields>

                    <Form.Footer>
                        <BackButton basePath={path}>{actionsLocale.back}</BackButton>
                        <Form.Submit>{actionsLocale.submit}</Form.Submit>
                    </Form.Footer>
                </>
            )
        }, [children, fields, path, actionsLocale])

        const { state } = useTypedLocation()
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
                    redirect={true}
                    submitData={submitData}
                    fetchInitialData={fetchInitialData}
                    locale={locale.form}
                >
                    {pageFormChildren}
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
    const locale = useLocaleProvider()
    const [drawerBody, setDrawerBody] = useState<(() => HTMLElement) | null>(null)
    const [visible, setVisible] = useState(false)
    const [submitSucceeded, setSubmitSucceeded] = useState(false)

    useEffect(() => {
        setVisible(true)
        return () => setVisible(false)
    }, [])

    const navigate = useNavigate()
    const location = useTypedLocation()

    const formRef = useRef<React.ComponentRef<typeof Form>>(null)
    const actionsLocale = locale.actions

    const {
        path,
        form: {
            edit: { fields, children },
        },
    } = config
    const { drawer } = config.update || {}

    const onBack = useCallback(() => {
        setVisible(false)
    }, [])

    const onSubmit = useCallback(async () => {
        const succeeded = await formRef.current?.handleSubmit()
        if (succeeded) {
            setSubmitSucceeded(true)
            setVisible(false)
        }
    }, [])

    const drawerRefCallback: RefCallback<React.ComponentRef<typeof Drawer>> = useCallback(
        (node) => {
            setDrawerBody(() => (node ? node.bodyElement : null))
        },
        [],
    )

    const popupContainer = drawerBody ?? getPopupContainer

    const drawerFooter = useMemo(() => {
        return !children ? (
            <div className={styles.drawerFooter}>
                <Button type="button" view="secondary" onClick={onBack} iconLeft={<FiX />}>
                    {actionsLocale.back}
                </Button>

                <Button type="button" onClick={onSubmit} iconLeft={<FiSave />}>
                    {actionsLocale.submit}
                </Button>
            </div>
        ) : null
    }, [children, onSubmit, onBack, actionsLocale])

    const drawerFormChildren = useMemo(() => {
        return children ? children : <Form.Fields>{fields}</Form.Fields>
    }, [children, fields])

    return (
        <Drawer
            ref={drawerRefCallback}
            visible={visible}
            onClose={(e) => {
                e.stopPropagation()
                setVisible(false)
            }}
            title={title}
            footer={drawer?.footer ?? drawerFooter}
            afterVisibleChange={(visible) => {
                if (!visible) {
                    const backLocation = location?.state?.background
                    navigate(
                        {
                            pathname: backLocation ? backLocation.pathname : path,
                            search: backLocation?.search ?? undefined,
                        },
                        {
                            state: {
                                update: { dataTable: submitSucceeded },
                                scrollTop: false,
                            },
                        },
                    )
                    setSubmitSucceeded(false)
                }
            }}
            width={drawer?.width ?? 900}
        >
            <PopupContainerContextProvider value={popupContainer}>
                <Form
                    ref={formRef}
                    submitData={submitData}
                    fetchInitialData={fetchInitialData}
                    locale={locale.form}
                >
                    {drawerFormChildren}
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
