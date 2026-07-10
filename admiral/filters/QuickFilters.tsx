import { useCallback, useLayoutEffect, useMemo, useRef, type ElementType } from 'react'
import { useCrudIndex } from '../crud/CrudIndexPageContext'
import styles from './Filters.module.scss'
import { FormInputType } from '../form/interfaces'
import {
    AjaxSelectInput,
    BooleanInput,
    DatePickerInput,
    DateRangePickerInput,
    SelectInput,
    TextInput,
    TimePickerInput,
    useForm,
} from '../form'
import cn from 'classnames'
import { useDebouncedCallback, useUpdateEffect } from '../utils/hooks'

export type QuickFiltersProps = {
    filters?: string[]
}

export function QuickFilters({ filters }: QuickFiltersProps) {
    const {
        setUrlState,
        urlState,
        filter: { fields: filterFields, options: filterOptions },
    } = useCrudIndex()
    const { values, setValues, setOptions } = useForm()
    const { filter } = urlState
    const shouldUpdateUrlState = useRef(true)

    useLayoutEffect(() => {
        setOptions(filterOptions)
    }, [filterOptions])

    const pushFilterToUrl = useDebouncedCallback((nextFilter: Record<string, any>) => {
        setUrlState((prevUrlState) => ({
            ...prevUrlState,
            filter: nextFilter,
            page: undefined,
        }))
    }, 500)

    useUpdateEffect(() => {
        // Skip the echo of a url -> form sync, otherwise applying a filter
        // from the url would push a duplicate history entry 500ms later.
        if (!shouldUpdateUrlState.current) {
            shouldUpdateUrlState.current = true
            return
        }
        if (JSON.stringify(filter) === JSON.stringify(values)) {
            return
        }
        pushFilterToUrl(values)

        // A newer values change supersedes the scheduled push (and unmount drops it).
        return pushFilterToUrl.cancel
    }, [values])

    useLayoutEffect(() => {
        if (JSON.stringify(filter) !== JSON.stringify(values)) {
            shouldUpdateUrlState.current = false
            setValues(filter)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])

    const renderName = useCallback(
        (type: FormInputType | undefined, props: any, Component: ElementType) => {
            const filteredInputProps = Object.entries({
                name: props?.name,
                type: props?.type,
                placeholder: props?.placeholder,
                size: props?.size,
                fetchOptions: props?.fetchOptions,
                format: props?.format,
                allowClear: props?.allowClear,
                mode: props?.mode,
                locale: props?.locale,
                style: props?.style,
                children: props?.children,
                suffix: props?.suffix,
            }).filter(([_, value]) => value)

            const inputProps: any = Object.fromEntries(filteredInputProps)

            switch (type) {
                case 'BooleanInput': {
                    return (
                        <div className={styles.quickFilters__boolean_filter}>
                            <span>{props.label}</span>
                            <BooleanInput {...inputProps} />
                        </div>
                    )
                }
                case 'TextInput':
                    return <TextInput {...inputProps} />

                case 'SelectInput': {
                    return <SelectInput {...inputProps} />
                }
                case 'AjaxSelectInput': {
                    return <AjaxSelectInput {...inputProps} />
                }
                case 'TimePickerInput': {
                    return <TimePickerInput {...inputProps} />
                }
                case 'DatePickerInput': {
                    return <DatePickerInput {...inputProps} />
                }
                case 'DateRangePickerInput': {
                    return <DateRangePickerInput {...inputProps} />
                }
                default:
                    // Custom (non-admiral) inputs promoted to quick filters render as
                    // authored — they bind to the filter form via useForm(), exactly
                    // like in the filter drawer.
                    return <Component {...props} />
            }
        },
        [],
    )

    const filtersToRender = useMemo(
        () =>
            filterFields
                .filter((field) => field.props.name && filters?.includes(String(field.props.name)))
                .map(({ type, component, props }) => {
                    return {
                        type,
                        component,
                        props,
                    }
                }),
        [filterFields, filters],
    )

    return (
        <ul className={styles.quickFilters}>
            {filtersToRender.map(({ type, component, props }) => {
                return (
                    <li
                        key={String(props.name)}
                        className={cn({
                            [styles.quickFilters__with_boolean_filter]: type == 'BooleanInput',
                        })}
                    >
                        {renderName(type, props, component)}
                    </li>
                )
            })}
        </ul>
    )
}
