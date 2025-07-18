import React, { useCallback } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { FormItemProps } from '../Item'
import { Button } from '../../ui'
import { FiPlus, FiX } from 'react-icons/fi'
import { nanoid } from 'nanoid'
import cn from 'classnames'
import type { IRecord as DataProviderRecord } from '../../dataProvider'
import { enUS } from '../locale'
import styles from '../Form.module.scss'
import { InputComponentWithName } from '../interfaces'

export interface ArrayInputProps extends FormItemProps {
    name: string
    columnSpan?: 1 | 2
    disableOrder?: boolean
    disableRemove?: boolean
    disableAdd?: boolean
    children: React.ReactNode | ((item: DataProviderRecord, idx: number) => React.ReactNode)
}

export const ArrayInput: InputComponentWithName<React.FC<ArrayInputProps>> = ({
    name,
    label,
    required,
    columnSpan = 2,
    disableOrder = false,
    disableRemove = false,
    disableAdd = false,
    children,
}) => {
    const {
        values,
        options,
        setOptions,
        setValues,
        errors,
        setErrors,
        locale: formLocale,
        ...formProps
    } = useForm()
    const locale = { ...enUS.fields.array, ...formLocale.fields.array }
    const forms: DataProviderRecord[] = values?.[name] ?? (required ? [{}] : [])
    const formsErrors = getFormErrorsByIndex(errors, name)
    const formOptions = getFormOptions(options, name)

    const createSetValuesFn = useCallback(
        (idx: number) => (param: any) => {
            setValues((values: any) => {
                const forms: DataProviderRecord[] = values?.[name] ?? []
                const form = forms?.[idx]

                let newState: any
                if (typeof param === 'function') {
                    newState = param(form)
                } else {
                    newState = param
                }

                return {
                    ...values,
                    [name]: [
                        ...forms.slice(0, idx),
                        {
                            ...newState,
                            // , id: newState.id || nanoid()
                        },
                        ...forms.slice(idx + 1),
                    ],
                }
            })
        },
        [],
    )

    const createSetErrorsFn = useCallback(
        (idx: number) => (value: any) => {
            setErrors((errors: any) => {
                const formErrors = getFormErrorsByIndex(errors, name)?.[idx] ?? {}

                let newState: Record<string, string[]>
                if (typeof value === 'function') {
                    newState = value(formErrors)
                } else {
                    newState = value
                }
                const newStateErrors = Object.entries(newState).reduce((acc, [key, value]) => {
                    acc[`${name}.${idx}.${key}`] = value
                    return acc
                }, {} as Record<string, string[]>)

                return {
                    ...errors,
                    ...newStateErrors,
                }
            })
        },
        [setErrors],
    )

    const handleRemove = useCallback(
        (idx: number) => () => {
            setValues((values: any) => {
                const forms: DataProviderRecord[] = values?.[name] ?? []
                return {
                    ...values,
                    [name]: [...forms.slice(0, idx), ...forms.slice(idx + 1)],
                }
            })
        },
        [],
    )

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        setValues((values: any) => {
            const forms: DataProviderRecord[] = values?.[name] ?? []

            return {
                ...values,
                [name]: [
                    ...forms,
                    {},
                    //  ...(!forms.length && required ? [{ id: nanoid() }] : [])
                ],
            }
        })
    }

    const renderChildrenAutoFocus = useCallback(
        (children: React.ReactNode, isNewCreatedFormItem: boolean) => {
            if (!Array.isArray(children)) {
                return React.isValidElement(children)
                    ? React.cloneElement<any>(children, {
                          autoFocus: isNewCreatedFormItem,
                          props: {
                              autoFocus: isNewCreatedFormItem,
                          },
                          key: children.key,
                      })
                    : children
            }

            let foundFirstInput = false

            return React.Children.map(children, (childrenItem, index) => {
                const isDisabled = childrenItem.props?.disabled

                if (!foundFirstInput && React.isValidElement(childrenItem)) {
                    if (!isDisabled) {
                        foundFirstInput = true
                        return React.cloneElement<any>(childrenItem, {
                            autoFocus: true,
                            key: childrenItem.key,
                        })
                    }
                }

                return childrenItem
            })
        },
        [],
    )

    return (
        <Form.Item label={label} columnSpan={2} labelAs="div" required={required}>
            <ol className={styles.arrayInput}>
                {forms.map((form, idx) => {
                    const formErrors = formsErrors[idx] ?? {}
                    const key = idx
                    const isNewCreatedFormItem = !!form && Object.keys(form).length === 0

                    const propsChildren =
                        typeof children === 'function' ? children(form, idx) : children
                    const renderedChildren = renderChildrenAutoFocus(
                        propsChildren,
                        !!isNewCreatedFormItem,
                    )

                    return (
                        <Form.ChildForm
                            key={key}
                            as="li"
                            className={cn(styles.arrayInput_Item, {
                                [styles.arrayInput_Item__ColumnSpanTwo]: columnSpan === 2,
                            })}
                            values={form}
                            setValues={createSetValuesFn(idx)}
                            options={formOptions}
                            setOptions={setOptions}
                            errors={formErrors}
                            setErrors={createSetErrorsFn(idx)}
                            locale={formLocale}
                            {...formProps}
                        >
                            <div
                                className={cn(styles.arrayInput_Header, {
                                    [styles.arrayInput_Header__NoOrder]: disableOrder,
                                    [styles.arrayInput_Header__Empty]:
                                        disableOrder && disableRemove,
                                })}
                            >
                                {!disableRemove && (
                                    <Button
                                        type="button"
                                        size="S"
                                        iconLeft={<FiX />}
                                        view="ghost"
                                        disabled={forms.length <= 1 && required}
                                        onClick={handleRemove(idx)}
                                    >
                                        {locale.remove}
                                    </Button>
                                )}
                            </div>
                            <div className={styles.arrayInput_Children}>{renderedChildren}</div>
                        </Form.ChildForm>
                    )
                })}
            </ol>

            {!disableAdd && (
                <div className={styles.arrayInput_Footer}>
                    <Button
                        type="button"
                        iconLeft={<FiPlus />}
                        view="secondary"
                        onClick={handleAdd}
                    >
                        {locale.add}
                    </Button>
                </div>
            )}
        </Form.Item>
    )
}

ArrayInput.inputName = 'ArrayInput'

const getFormErrorsByIndex = (
    errors: Record<string, string[]>,
    name: string,
): Record<string, Record<string, string[]>> => {
    // return
    // {
    //    0: { childFilter: string[] },
    //    1: { childFilter: string[] },
    // }

    return Object.entries(errors).reduce((acc, [key, value]) => {
        // filter.(0).(childFilter)
        const reg = new RegExp(`^${name}\\.\(\\d+\)\\.\(.+\)`)
        const match = key.match(reg)

        if (match) {
            const [, idx, childFilter] = match
            acc[idx] = { ...acc[idx], [childFilter]: value }
        }

        return acc
    }, {} as Record<string, Record<string, string[]>>)
}

const getFormOptions = (options: Record<string, any>, name: string): Record<string, any> => {
    // return
    // { childFilter: any }

    return Object.entries(options).reduce((acc, [key, value]) => {
        // filter.(childFilter)
        const reg = new RegExp(`^${name}\\.\(.+\)`)
        const match = key.match(reg)

        if (match) {
            const [, childFilter] = match
            acc[childFilter] = value
        }

        return acc
    }, {} as Record<string, any>)
}
