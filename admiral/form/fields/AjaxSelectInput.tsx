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
import { useDebouncedCallback, useLatest, useLatestRequest } from '../../utils/hooks'
import { FieldRuleProps, withFieldRules } from '../fieldRules'
import { isEmptyValue } from '../rules'

const joinPath = (scope: string, name: string) => (scope ? `${scope}.${name}` : name)

export interface AjaxSelectInputProps
    extends
        Omit<SelectProps, 'showSearch' | 'onSearch' | 'loading' | 'children' | 'filterOption'>,
        FormItemProps,
        FieldRuleProps {
    name: string
    /**
     * Fetch the field's options. The third argument carries the field's scope
     * values (R6) so a cascade child can query by its parent (e.g. cities of the
     * selected country). The argument is additive — two-argument callbacks keep
     * working unchanged.
     */
    fetchOptions: (
        field: string,
        query?: string,
        values?: Record<string, any>,
    ) => Promise<OptionType[]>
    fetchTimeout?: number
    /**
     * Parent field names that, when changed by an operator, reset this field to
     * `null` and refetch its options (R7, KTD9). Paths are resolved within the
     * field's own scope (so an ArrayInput row resets only its own row).
     */
    resetOnChangeOf?: string[]
    onChange?: (value: any) => void
}

const AjaxSelectInputBase: InputComponentWithName<
    (props: AjaxSelectInputProps) => React.JSX.Element
> = function AjaxSelectInput({
    name,
    label,
    required = false,
    columnSpan,
    fetchOptions,
    fetchTimeout = 500,
    resetOnChangeOf,
    onChange,
    ...selectProps
}: AjaxSelectInputProps) {
    const getPopupContainer = usePopupContainer()
    const { filter } = useCrudIndex()
    const [options, setOptions] = useState<OptionType[]>([])
    const [loading, setLoading] = useState(false)
    const fetched = useRef(false)

    const {
        values,
        errors,
        options: formOptions,
        setValues,
        scopePath = '',
        fieldChange,
    } = useForm()
    const value = values[name]
    const error = errors[name]?.[0]

    // Always-current values snapshot read inside the stable cascade handler, so
    // the subscription never re-creates on a keystroke (KTD9).
    const valuesRef = useLatest(values)

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
        async (query = '', valuesOverride?: Record<string, any>) => {
            // Search passes no override → the latest scope values. A cascade reset
            // overlays the event value onto the stale snapshot (see the handler).
            const scopeValues = valuesOverride ?? valuesRef.current
            const isCurrent = beginRequest()
            setLoading(true)
            try {
                const options = await fetchOptions(name, query, scopeValues)
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
        [fetchOptions, name, filter, beginRequest, valuesRef],
    )

    // The debounced wrapper always calls the latest fetchResults, so a changed
    // `fetchOptions` prop is never queried with stale arguments.
    const onSearch = useDebouncedCallback(fetchResults, fetchTimeout)

    // Read the latest fetchResults inside the cascade handler without listing it
    // as an effect dep — otherwise a changed `fetchOptions` prop would tear down
    // and recreate the subscription (KTD9: subscription stays stable).
    const fetchResultsRef = useLatest(fetchResults)

    // Cascade subscription (KTD9). Resets fire ONLY from the event bus — a real
    // onChange of a parent field. Initial load, FormRef.setValues and direct
    // setValues never dispatch, so no handler runs on initial load (R8/AE5).
    const resetKey = resetOnChangeOf?.join(' ')
    useEffect(() => {
        if (!fieldChange || !resetOnChangeOf?.length) return
        const fullPath = joinPath(scopePath, name)

        const handler = (parent: string) => (event: { path: string; value: unknown }) => {
            // 1. Kill any pending debounced search: a stale search must not
            //    repopulate the previous parent's options.
            onSearch.cancel()
            // 2. Synchronously clear: a failed refetch must not leave the old
            //    parent's options selectable.
            setOptions([])
            // 3. Reset the value only if it is currently non-empty. Writing
            //    `null` (not `undefined`: JSON.stringify would drop the key and
            //    the backend would keep the stale value) and notifying lets a
            //    region→city chain cascade. An already-empty value does NOT
            //    notify — terminating country→region→city chains and a↔b cycles.
            if (!isEmptyValue(valuesRef.current[name])) {
                setValues((v: Record<string, any>) => ({ ...v, [name]: null }))
                fieldChange.notify({ path: fullPath, value: null })
            }
            // 4. Eager refetch with the EVENT value overlaid onto the stale
            //    snapshot. `notify` fires synchronously inside the parent's
            //    onChange BEFORE its setValues is applied, so valuesRef.current
            //    still holds the OLD parent value — overlaying event.value is
            //    required or the refetch reads the old parent's options (AE6).
            fetchResultsRef.current('', { ...valuesRef.current, [parent]: event.value })
        }

        const unsubscribes = resetOnChangeOf.map((parent) =>
            fieldChange.subscribe(joinPath(scopePath, parent), handler(parent)),
        )
        return () => unsubscribes.forEach((unsubscribe) => unsubscribe())
        // Depend only on stable keys: the bus identity is stable, scopePath
        // changes per ArrayInput row (must re-subscribe), and resetKey is a stable
        // serialization of the parent list. onSearch/setValues/setOptions/refs are
        // stable, so a keystroke never recreates the subscription.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldChange, scopePath, name, resetKey])

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

AjaxSelectInputBase.inputName = 'AjaxSelectInput'

export const AjaxSelectInput = withFieldRules(AjaxSelectInputBase)
