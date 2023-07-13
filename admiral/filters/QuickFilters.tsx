import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useCrudIndex } from '../crud/CrudIndexPageContext'
import styles from './Filters.module.scss'
import { FormInputType } from '../form/interfaces'
import {
    AjaxSelectInput,
    BooleanInput,
    DatePickerInput,
    Form,
    SelectInput,
    TextInput,
    TimePickerInput,
    useForm,
} from '../form'

export type QuickFiltersProps = {
    filters?: string[]
}

export const QuickFilters: React.FC<QuickFiltersProps> = ({ filters }) => {
    const {
        setUrlState,
        urlState,
        filter: { fields: filterFields, options: filterOptions },
    } = useCrudIndex()
    const { values, setValues, setOptions } = useForm()
    const { filter } = urlState
    const shouldUpdateUrlState = useRef(true)
    const isFiltersVisible = Object.keys(filterOptions)?.length

    useLayoutEffect(() => {
        setOptions(filterOptions)
    }, [filterOptions])

    useEffect(() => {
        if (shouldUpdateUrlState.current) {
            setUrlState((prevUrlState) => ({
                ...prevUrlState,
                filter: values,
            }))
        } else {
            shouldUpdateUrlState.current = true
        }
    }, [values])

    useLayoutEffect(() => {
        if (JSON.stringify(filter) !== JSON.stringify(values)) {
            shouldUpdateUrlState.current = false
            setValues(filter)
        }
    }, [filter])

    const renderName = useCallback(
        (type: FormInputType, props) => {
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
                default:
                    return <></>
            }
        },
        [filterOptions],
    )

    const filtersToRender = useMemo(
        () =>
            filterFields
                .filter((field) => field.props.name && filters?.includes(String(field.props.name)))
                .map(({ type, props }) => {
                    return {
                        type,
                        props,
                    }
                }),
        [filterFields],
    )

    return isFiltersVisible ? (
        <ul className={styles.quickFilters}>
            {filtersToRender.map(({ type, props }, index) => {
                return <li key={type + index}>{renderName(type, props)}</li>
            })}
        </ul>
    ) : (
        <></>
    )
}
