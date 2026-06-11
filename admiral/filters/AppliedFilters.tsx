import { useCallback } from 'react'
import { useCrudIndex } from '../crud/CrudIndexPageContext'
import { Button } from '../ui'
import { FiX } from 'react-icons/fi'
import styles from './Filters.module.scss'
import { FormInputType } from '../form/interfaces'
import { format, parseISO } from 'date-fns'
import { FilterField } from '../crud/IndexPageContext/interfaces'

// TODO: replace Button with Tag component when ready

export type AppliedFiltersProps = {}

export function AppliedFilters() {
    const {
        setUrlState,
        urlState: { filter },
        filter: { fields: filterFields, options: filterOptions },
    } = useCrudIndex()

    const renderName = useCallback(
        (
            name: string,
            type: FormInputType | undefined,
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

                case 'SelectInput':
                case 'AjaxSelectInput': {
                    const isMultiple = Array.isArray(value)
                    const options = filterOptions[name]

                    if (isMultiple) {
                        const labels = options
                            ? value.map((i) => options.find((o) => o.value == i)?.label ?? i)
                            : [value.length]

                        const optionName = labels.length > 1 ? labels.length : labels[0]
                        return label ? `${label}: ${optionName}` : optionName
                    }

                    const optionName = options
                        ? (options.find((n) => n.value == value)?.label ?? value)
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

                case 'DateRangePickerInput': {
                    const date = [
                        format(parseISO(value[0]), 'dd.MM.yyyy'),
                        format(parseISO(value[1]), 'dd.MM.yyyy'),
                    ]
                    return label ? `${label}: ${date[0]} - ${date[1]}` : `${date[0]} - ${date[1]}`
                }

                default: {
                    // Custom inputs: best-effort chip for primitive values, so an
                    // applied custom filter never shows up as an empty tag
                    if (typeof value === 'string' || typeof value === 'number') {
                        return label ? `${label}: ${value}` : value
                    }
                    return label ?? name
                }
            }
        },
        [filterOptions],
    )

    const filters = Object.entries(filter)
        .filter(([name]) => filterFields.some((field) => field.name === name))
        .filter(([, value]) => value !== null && value !== undefined && value !== '')
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
        [setUrlState, filter],
    )

    return filters.length ? (
        <div className={styles.appliedFilters}>
            {filters.map(({ name, label, type, value, extra }) => {
                return (
                    <Button
                        key={name}
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
                )
            })}
        </div>
    ) : (
        <></>
    )
}
