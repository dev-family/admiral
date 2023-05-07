import React, { createContext, useContext, useState, useMemo, useCallback } from 'react'
import { useUrlState } from '../utils/hooks'
import { INPUT_NAMES } from '../form/interfaces'
import { RecordOptions } from '../dataProvider'
import {
    CrudIndexUrlState,
    CrudIndexPageValueType,
    FilterField,
} from './IndexPageContext/interfaces'
import { getSelectExtra, getTimePickerExtra } from './IndexPageContext/filterFieldExtra'

const PAGE_DEFAULT = '1'
const PAGE_SIZE_DEFAULT = '10'

const defaultUrlState: CrudIndexUrlState = {
    page: PAGE_DEFAULT,
    page_size: PAGE_SIZE_DEFAULT,
    filter: {},
    sort: {},
    search: '',
}

export const CrudIndexPageContext = createContext<CrudIndexPageValueType>({
    filterDrawer: false,
    setFilterDrawer: () => {},
    urlState: defaultUrlState,
    setUrlState: () => {},
    filter: { fields: [], options: {}, setFilterOptions: () => {} },
})

export const CrudIndexPageContextProvider: React.FC<{ filterFields?: JSX.Element }> = ({
    filterFields,
    children,
}) => {
    const [filterDrawer, setFilterDrawer] = useState<boolean>(false)
    const [urlState, setUrlState] = useUrlState<CrudIndexUrlState>({
        page: '1',
        page_size: '10',
        sort: {},
        filter: {},
        search: '',
    })
    const [filterOptions, setFilterOptions] = useState<RecordOptions>({})

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
                const selectExtra =
                    child.type.inputName === INPUT_NAMES.select ? getSelectExtra(child) : undefined

                if (selectExtra?.options) {
                    setFilterOptions((prev) => ({
                        ...prev,
                        [child.props.name]: selectExtra.options,
                    }))
                }

                return {
                    name: child.props.name,
                    label: child.props.label,
                    type: child.type.inputName,
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

    return (
        <CrudIndexPageContext.Provider
            value={{
                urlState: crudIndexUrlState,
                setUrlState: setCrudIndexUrlState,
                filterDrawer,
                setFilterDrawer,
                filter: { fields: _filterFields, options: filterOptions, setFilterOptions },
            }}
        >
            {children}
        </CrudIndexPageContext.Provider>
    )
}

export function useCrudIndex() {
    return useContext(CrudIndexPageContext)
}
