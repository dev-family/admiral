import React, { createContext, useContext, useState, useMemo, useCallback } from 'react'
import { useUrlState } from '../utils/hooks'
import { INPUT_NAMES } from '../form/interfaces'
import { RecordOptions } from '../dataProvider'
import {
    CrudIndexUrlState,
    CrudIndexPageValueType,
    FilterField,
} from './IndexPageContext/interfaces'
import { getTimePickerExtra } from './IndexPageContext/filterFieldExtra'

const PAGE_DEFAULT = '1'
const PAGE_SIZE_DEFAULT = '10'

const defaultUrlState: CrudIndexUrlState = {
    page: PAGE_DEFAULT,
    page_size: PAGE_SIZE_DEFAULT,
    filter: {},
    sort: {},
}

export const CrudIndexPageContext = createContext<CrudIndexPageValueType>({
    filterDrawer: false,
    setFilterDrawer: () => {},
    urlState: defaultUrlState,
    setUrlState: () => {},
    filter: { fields: [], options: {}, setFilterOptions: () => {} },
})

export function CrudIndexPageContextProvider({
    filterFields,
    children,
}: {
    filterFields?: React.JSX.Element
    children?: React.ReactNode
}) {
    const [filterDrawer, setFilterDrawer] = useState<boolean>(false)
    const [urlState, setUrlState] = useUrlState<CrudIndexUrlState>({
        page: '1',
        page_size: '10',
        sort: {},
        filter: {},
    })
    const [filterOptions, setFilterOptions] = useState<RecordOptions>({})

    const getFilterChildType = (child: any) => {
        return child.type.inputName
    }

    const _filterFields: FilterField[] = useMemo(() => {
        if (!filterFields) {
            return []
        }

        const children = filterFields.props.children ?? []
        return (Array.isArray(children) ? children : [children])
            .filter((child: any) => {
                if (typeof child === 'object') {
                    return typeof child.type === 'function'
                }
                return false
            })
            .map((child: any): FilterField => {
                const type = getFilterChildType(child)
                return {
                    name: child.props.name,
                    label: child.props.label,
                    type,
                    props: child.props,
                    extra: {
                        timePicker:
                            child.type.inputName === INPUT_NAMES.timePicker
                                ? getTimePickerExtra(child)
                                : undefined,
                    },
                }
            })
    }, [filterFields])

    const crudIndexUrlState = useMemo(() => ({ ...defaultUrlState, ...urlState }), [urlState])
    const setCrudIndexUrlState = useCallback(
        (state: any) => {
            let newState: Partial<CrudIndexUrlState>
            if (typeof state === 'function') {
                newState = state(urlState)
            } else {
                newState = state
            }

            if (newState.page == PAGE_DEFAULT) newState.page = undefined
            if (newState.page_size == PAGE_SIZE_DEFAULT) newState.page_size = undefined

            setUrlState(newState)
        },
        [urlState],
    )

    const value = useMemo(
        () => ({
            urlState: crudIndexUrlState,
            setUrlState: setCrudIndexUrlState,
            filterDrawer,
            setFilterDrawer,
            filter: { fields: _filterFields, options: filterOptions, setFilterOptions },
        }),
        [crudIndexUrlState, setCrudIndexUrlState, filterDrawer, _filterFields, filterOptions],
    )

    return <CrudIndexPageContext.Provider value={value}>{children}</CrudIndexPageContext.Provider>
}

export function useCrudIndex() {
    return useContext(CrudIndexPageContext)
}
