import React, { useCallback } from 'react'
import { useCrudIndex } from '../crud/CrudIndexPageContext'
import { Button } from '../ui'
import { FiX } from 'react-icons/fi'
import styles from './Filters.module.scss'
import { FormInputType } from '../form/interfaces'
import { format, parseISO } from 'date-fns'
import { FilterField } from '../crud/IndexPageContext/interfaces'

// TODO: replace Button with Tag component when ready

export type AppliedFiltersProps = {}

export const AppliedFilters: React.FC<AppliedFiltersProps> = () => {
    const {
        setUrlState,
        urlState: { filter },
        filter: { fields: filterFields, options: filterOptions },
    } = useCrudIndex()

    const renderName = useCallback(
        (
            name: string,
            type: FormInputType,
            value: any,
            label: string | undefined,
            extra: FilterField['extra'],
        ) => {
            if (typeof value === 'undefined' || value === null) return null

            switch (type) {
                case 'BooleanInput': {
                    return `${label || name}: ${value}`
                }

                case 'TextInput':
                case 'SlugInput': {
                    return label ? `${label}: ${value}` : value
                }

                case 'SelectInput': {
                    const isMultiple = Array.isArray(value)
                    const options = filterOptions[name]

                    if (isMultiple) {
                        const labels = options
                            ? value.map((i) => options.find((o) => o.value === i)?.label ?? i)
                            : [value.length]

                        const optionName = labels.length > 1 ? labels.length : labels[0]
                        return label ? `${label}: ${optionName}` : optionName
                    }

                    const optionName = options
                        ? options.find((n) => n.value === value)?.label ?? value
                        : value
                    return label ? `${label}: ${optionName}` : optionName
                }

                case 'TimePickerInput': {
                    const { format: timeFormat } = extra.timePicker!

                    const time = format(parseISO(value), timeFormat)
                    return label ? `${label}: ${time}` : time
                }

                case 'DatePickerInput': {
                    const date = format(parseISO(value), 'dd.MM.yyyy')
                    return label ? `${label}: ${date}` : date
                }

                default:
                    return null
            }
        },
        [filterOptions],
    )

    const filters = Object.entries(filter)
        .filter(([name]) => filterFields.some((field) => field.name === name))
        .map(([name, value]) => {
            const field = filterFields.find((field) => field.name === name)
            return {
                name,
                label: field!.label,
                type: field!.type,
                value,
                extra: field!.extra,
            }
        })
        .sort(
            (a, b) =>
                filterFields.findIndex((f) => f.name === a.name) -
                filterFields.findIndex((f) => f.name === b.name),
        )

    const onRemove = useCallback(
        (name: string) => () => {
            setUrlState((prev) => ({
                ...prev,
                page: '1',
                filter: { ...filter, [name]: undefined },
            }))
        },
        [setUrlState],
    )

    return (
        <div className={styles.appliedFilters}>
            {filters.map(({ name, label, type, value, extra }, idx) => {
                return value ? (
                    <Button
                        key={type + idx}
                        type="button"
                        iconRight={
                            <FiX
                                className={styles.appliedFilters_Remove}
                                onClick={onRemove(name)}
                            />
                        }
                        size="XS"
                        view="ghost"
                    >
                        {renderName(name, type, value, label, extra)}
                    </Button>
                ) : (
                    <React.Fragment key={type + idx}></React.Fragment>
                )
            })}
        </div>
    )
}
