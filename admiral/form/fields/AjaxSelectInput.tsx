import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Select, Spin } from '../../ui'
import type { SelectProps } from '../../ui/Select/interfaces'
import { FormItemProps } from '../Item'
import { InputComponentWithName } from '../interfaces'
import { usePopupContainer } from '../../crud/PopupContainerContext'
import { OptionType } from '../../dataProvider'
import { useCrudIndex } from '../../crud/CrudIndexPageContext'
import { useDebouncedCallback, useLatestRequest } from '../../utils/hooks'

export interface AjaxSelectInputProps
    extends
        Omit<SelectProps, 'showSearch' | 'onSearch' | 'loading' | 'children' | 'filterOption'>,
        FormItemProps {
    name: string
    fetchOptions: (field: string, query?: string) => Promise<OptionType[]>
    fetchTimeout?: number
    onChange?: (value: any) => void
}

export const AjaxSelectInput: InputComponentWithName<
    (props: AjaxSelectInputProps) => React.JSX.Element
> = function AjaxSelectInput({
    name,
    label,
    required = false,
    columnSpan,
    fetchOptions,
    fetchTimeout = 500,
    onChange,
    ...selectProps
}: AjaxSelectInputProps) {
    const getPopupContainer = usePopupContainer()
    const { filter } = useCrudIndex()
    const [options, setOptions] = useState<OptionType[]>([])
    const [loading, setLoading] = useState(false)
    const fetched = useRef(false)

    const { values, errors, options: formOptions, setValues } = useForm()
    const value = values[name]
    const error = errors[name]?.[0]

    const optionsByName = formOptions[name]
    useEffect(() => {
        if (Array.isArray(optionsByName) && !fetched.current) setOptions(optionsByName)
    }, [optionsByName])

    const _onChange = useCallback(
        (value: any) => {
            setValues((values: any) => ({ ...values, [name]: value }))
            if (onChange) onChange(value)
        },
        [name, onChange, setValues],
    )

    // Out-of-order responses must not overwrite newer ones.
    const beginRequest = useLatestRequest()

    const fetchResults = useCallback(
        async (query = '') => {
            const isCurrent = beginRequest()
            setLoading(true)
            try {
                const options = await fetchOptions(name, query)
                if (!isCurrent()) return
                fetched.current = true
                setOptions(options)
                filter.setFilterOptions((prev: any) => ({ ...prev, [name]: options }))
            } catch (e) {
                console.error(`[Admiral] Failed to fetch options for "${name}":`, e)
            } finally {
                if (isCurrent()) {
                    setLoading(false)
                }
            }
        },
        [fetchOptions, name, filter, beginRequest],
    )

    // The debounced wrapper always calls the latest fetchResults, so a changed
    // `fetchOptions` prop is never queried with stale arguments.
    const onSearch = useDebouncedCallback(fetchResults, fetchTimeout)

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <Select
                getPopupContainer={getPopupContainer}
                showSearch
                onSearch={onSearch}
                loading={loading}
                {...selectProps}
                value={value}
                onChange={_onChange}
                alert={!!error}
                filterOption={false}
                options={options}
                notFoundContent={loading ? <Spin size="small" /> : null}
            />
        </Form.Item>
    )
}

AjaxSelectInput.inputName = 'AjaxSelectInput'
