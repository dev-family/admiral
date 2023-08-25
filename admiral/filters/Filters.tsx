import React, { useCallback, useRef, useEffect } from 'react'
import { useCrudIndex } from '../crud/CrudIndexPageContext'
import { Drawer, Button } from '../ui'
import { Form, FormProps } from '../form'
import { FiSave, FiX } from 'react-icons/fi'
import { Locale } from './interfaces'
import { enUS } from './locale'
import styles from './Filters.module.scss'
import { GetFiltersFormDataResult } from '../dataProvider'

export type FiltersProps = {
    locale?: Locale
    fetchInitialData?: (urlState: Record<string, any>) => Promise<GetFiltersFormDataResult>
}

export const Filters: React.FC<FiltersProps> = ({ locale, fetchInitialData, children }) => {
    const {
        filterDrawer,
        setFilterDrawer,
        setUrlState,
        urlState,
        filter: { setFilterOptions },
    } = useCrudIndex()

    const filtersLocale = locale?.filters ?? enUS

    const formRef = useRef<React.ElementRef<typeof Form>>(null)

    useEffect(() => {
        const fetch = async () => {
            const options = (await fetchInitialData?.(urlState.filter))?.options ?? {}
            setFilterOptions((prev) => ({ ...prev, ...options }))
        }
        fetch()
    }, [])

    const hideDrawer = useCallback(() => {
        setFilterDrawer(false)
    }, [])

    const onReset = useCallback(() => {
        setUrlState({ filter: {} })
        hideDrawer()
    }, [setUrlState, hideDrawer])

    const onSubmit = useCallback(() => {
        const filters = formRef.current?.values ?? {}
        setUrlState({ ...urlState, filter: filters, page: undefined })
        hideDrawer()
    }, [setUrlState, hideDrawer, formRef])

    const _fetchInitialData: FormProps['fetchInitialData'] = useCallback(async () => {
        const options = (await fetchInitialData?.(urlState.filter))?.options ?? {}

        return {
            data: urlState.filter,
            values: options,
        }
    }, [urlState, fetchInitialData])

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
