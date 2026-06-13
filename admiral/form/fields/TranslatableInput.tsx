import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { FormItemProps } from '../Item'
import { Tabs } from '../../ui'

import type { IRecord as DataProviderRecord } from '../../dataProvider'
import { TabsType } from '../../ui/Tabs/interfaces'
import { TextInput, TextInputProps } from './TextInput'
import { EditorInput, EditorInputProps } from './EditorInput'
import { MultilineTextInput, MultilineTextInputProps } from './MultilineTextInput'
import { FieldRuleProps, withFieldRules } from '../fieldRules'

type FieldMap = {
    editor: EditorInputProps
    text: TextInputProps
    multilineText: MultilineTextInputProps
}

type FieldProps<K extends keyof FieldMap> = {
    field: K
    props?: Omit<
        FieldMap[K],
        // Inner fields are scoped to `{ [lang]: value }`, so per-field rule props
        // are semantically empty (R9/KTD11); only the TranslatableInput itself
        // takes rule props (hiding the whole field).
        | 'label'
        | 'error'
        | 'showError'
        | 'required'
        | 'columnSpan'
        | 'onLabelClick'
        | 'labelAs'
        | 'name'
        | keyof FieldRuleProps
    >
}

type RenderFunc<K extends keyof FieldMap> = (props: FieldMap[K]) => React.ReactNode
type RenderFuncMap = { [K in keyof FieldMap]: RenderFunc<K> }

const fields: RenderFuncMap = {
    editor: EditorInput,
    multilineText: MultilineTextInput,
    text: TextInput,
}

type LanguageType = {
    label: string
    value: string
}

type TranslatableInputType = {
    name: string
    placeholder?: string | undefined
    languages: LanguageType[]
    tabType?: TabsType
}

const TranslatableInputBase = <K extends keyof FieldMap>(
    props: FieldProps<K> &
        TranslatableInputType &
        FormItemProps &
        Omit<FieldRuleProps, 'disabledWhen'>,
) => {
    const { name, label, required, languages, tabType = 'card', field, props: filedProps } = props
    const {
        values,
        setValues,
        errors,
        setErrors,
        scopePath: parentScopePath = '',
        ...formProps
    } = useForm()
    const [activeTabKey, setActiveTabKey] = useState<string>(languages[0]?.value)

    const Component = fields[field]

    const forms: DataProviderRecord = values[name] ?? {}
    const formsErrors = getFormErrors(errors, name)

    const createSetValuesFn = useCallback(
        (field: string) => (param: any) => {
            setValues((prevValues: any) => {
                const currentForms = (prevValues?.[name] ?? {}) as DataProviderRecord
                // Child inputs see `{ [lang]: value }` as their values, so a
                // functional updater must receive the same shape.
                const newState =
                    typeof param === 'function' ? param({ [field]: currentForms[field] }) : param

                return {
                    ...prevValues,
                    [name]: {
                        ...currentForms,
                        ...newState,
                    },
                }
            })
        },
        [name, setValues],
    )

    const createSetErrorsFn = useCallback(
        (value: any) => {
            setErrors((errors: any) => {
                const formErrors = getFormErrors(errors, name) ?? {}

                let newState: Record<string, string[]>
                if (typeof value === 'function') {
                    newState = value(formErrors)
                } else {
                    newState = value
                }

                const newStateErrors = Object.entries(newState).reduce(
                    (acc, [key, value]) => {
                        acc[`${name}.${key}`] = value
                        return acc
                    },
                    {} as Record<string, string[]>,
                )

                return {
                    ...errors,
                    ...newStateErrors,
                }
            })
        },
        [setErrors],
    )

    const onTabChange = useCallback((key: string) => {
        setActiveTabKey(key)
    }, [])

    useEffect(() => {
        const tabsWithErrors = Object.keys(formsErrors)
        if (tabsWithErrors.length) setActiveTabKey(tabsWithErrors[0])
    }, [errors])

    return (
        <>
            <Form.Item label={label} columnSpan={2} labelAs="div" required={required}>
                <Tabs
                    type={tabType}
                    activeKey={activeTabKey}
                    onChange={onTabChange}
                    items={languages.map(({ label, value }) => ({
                        key: value,
                        label,
                        children: (
                            <Form.ChildForm
                                values={{ [value]: forms?.[value] }}
                                setValues={createSetValuesFn(value)}
                                errors={formsErrors[value] ?? {}}
                                setErrors={createSetErrorsFn}
                                {...formProps}
                                scopePath={joinPath(parentScopePath, name)}
                            >
                                {React.createElement(Component, {
                                    ...filedProps,
                                    name: value,
                                } as React.Attributes & FieldMap[K] & { name: string })}
                            </Form.ChildForm>
                        ),
                    }))}
                />
            </Form.Item>
        </>
    )
}

TranslatableInputBase.inputName = 'TranslatableInput'

const joinPath = (scope: string, name: string) => (scope ? `${scope}.${name}` : name)

/**
 * Public generic signature of TranslatableInput — preserved across the HOC wrap
 * (which is itself non-generic at runtime). The runtime wrap is identical to
 * every other field; only the type is cast back so `field` / `props` stay
 * type-checked at call sites, and the `inputName` static survives the cast.
 */
type TranslatableInputComponent = (<K extends keyof FieldMap>(
    props: FieldProps<K> &
        TranslatableInputType &
        FormItemProps &
        Omit<FieldRuleProps, 'disabledWhen'>,
) => React.JSX.Element | null) & { inputName: 'TranslatableInput' }

export const TranslatableInput = withFieldRules(
    TranslatableInputBase as React.ComponentType<
        FieldProps<keyof FieldMap> &
            TranslatableInputType &
            FormItemProps &
            Omit<FieldRuleProps, 'disabledWhen'> & { name: string }
    >,
    { supportsDisabled: false, dispatchesChange: false },
) as unknown as TranslatableInputComponent

const getFormErrors = (
    errors: Record<string, string[]>,
    name: string,
): Record<string, Record<string, string[]>> => {
    // return
    // {
    //   childFilter : string[],
    //   childFilter: string[],
    // }

    return Object.entries(errors).reduce(
        (acc, [key, value]) => {
            //filter.(childFilter)
            const reg = new RegExp(`^${name}\\.(.+)`)
            const match = key.match(reg)

            if (match) {
                const [, childFilter] = match
                acc[childFilter] = { [childFilter]: value }
            }

            return acc
        },
        {} as Record<string, Record<string, string[]>>,
    )
}
