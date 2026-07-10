import React, { useCallback, useRef, useEffect } from 'react'
import { useCrudIndex } from '../crud/CrudIndexPageContext'
import { Drawer, Button } from '../ui'
import { Form, FormProps } from '../form'
import { FiSave, FiX } from 'react-icons/fi'
import { Locale } from './interfaces'
import { enUS } from './locale'
import styles from './Filters.module.scss'
import { GetFiltersFormDataResult } from '../dataProvider'
import { useLatest, useLatestRequest } from '../utils/hooks'

export type FiltersProps = {
    locale?: Locale
    fetchInitialData?: (urlState: Record<string, any>) => Promise<GetFiltersFormDataResult>
    children?: React.ReactNode
}

export function Filters({ locale, fetchInitialData, children }: FiltersProps) {
    const {
        filterDrawer,
        setFilterDrawer,
        setUrlState,
        urlState,
        filter: { setFilterOptions },
    } = useCrudIndex()

    const filtersLocale = locale?.filters ?? enUS

    const formRef = useRef<React.ComponentRef<typeof Form>>(null)

    // Always read the current filter through a ref: the drawer form must not
    // refetch options or wipe in-progress input on every url change.
    const filterRef = useLatest(urlState.filter)

    // Drop the response if Filters unmounts mid-flight: setFilterOptions
    // writes into the still-mounted page context.
    const beginRequest = useLatestRequest()
    useEffect(() => {
        const isCurrent = beginRequest()
        const fetch = async () => {
            try {
                const options = (await fetchInitialData?.(filterRef.current))?.options ?? {}
                if (isCurrent()) {
                    setFilterOptions((prev) => ({ ...prev, ...options }))
                }
            } catch (e) {
                console.error('[Admiral] Failed to fetch filter options:', e)
            }
        }
        fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // rc-drawer keeps the form mounted after the first open, so re-sync the
    // form values with the applied filters every time the drawer opens.
    useEffect(() => {
        if (filterDrawer) {
            formRef.current?.setValues({ ...filterRef.current })
        }
    }, [filterDrawer, filterRef])

    const hideDrawer = useCallback(() => {
        setFilterDrawer(false)
    }, [setFilterDrawer])

    const onReset = useCallback(() => {
        setUrlState({ filter: {}, page: undefined })
        hideDrawer()
    }, [setUrlState, hideDrawer])

    const onSubmit = useCallback(() => {
        const filters = formRef.current?.values ?? {}
        setUrlState((prev: Record<string, any>) => ({ ...prev, filter: filters, page: undefined }))
        hideDrawer()
    }, [setUrlState, hideDrawer])

    const _fetchInitialData: FormProps['fetchInitialData'] = useCallback(async () => {
        const options = (await fetchInitialData?.(filterRef.current))?.options ?? {}

        return {
            data: filterRef.current,
            values: options,
        }
    }, [fetchInitialData, filterRef])

    return (
        <Drawer
            visible={filterDrawer}
            onClose={hideDrawer}
            title={filtersLocale.title}
            footer={
                <div className={styles.footer}>
                    <Button type="button" view="secondary" onClick={onReset} iconLeft={<FiX />}>
                        {filtersLocale.clear}
                    </Button>
                    <Button type="button" onClick={onSubmit} iconLeft={<FiSave />}>
                        {filtersLocale.submit}
                    </Button>
                </div>
            }
        >
            <Form ref={formRef} fetchInitialData={_fetchInitialData} locale={locale?.form}>
                <Form.Fields singleColumn>{children}</Form.Fields>
            </Form>
        </Drawer>
    )
}
