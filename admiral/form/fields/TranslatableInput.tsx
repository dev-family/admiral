import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { FormItemProps } from '../Item'
import { Tabs } from '../../ui'

import type { IRecord as DataProviderRecord } from '../../dataProvider'
import { InputComponentWithName } from '../interfaces'
import { TabsType } from '../../ui/Tabs/interfaces'
import { TextInput } from './TextInput'
import { EditorInput } from './EditorInput'
import { MultilineTextInput } from './MultilineTextInput'

const fields = {
    editor: EditorInput,
    multilineText: MultilineTextInput,
    text: TextInput,
} as const

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

type InputTypes = {
    [K in keyof typeof fields]: {
        fieldName: K
        fieldProps?: Omit<React.ComponentProps<typeof fields[K]>, 'name'>
    }
}[keyof typeof fields]

export type TranslatableInputProps = TranslatableInputType & FormItemProps & InputTypes

export const TranslatableInput: InputComponentWithName<React.FC<TranslatableInputProps>> = ({
    name,
    label,
    required,
    languages,
    tabType = 'card',
    fieldName,
    fieldProps,
    ...props
}) => {
    const { values, setValues, errors, setErrors, ...formProps } = useForm()
    const [activeTabKey, setActiveTabKey] = useState<string>(languages[0]?.value)

    const Component = fields[fieldName]
    const componentProps = { ...(fieldProps && fieldProps) }

    const forms: DataProviderRecord = values[name] ?? {}
    const formsErrors = getFormErrors(errors, name)

    const createSetValuesFn = useCallback(
        (field: string) => (param: any) => {
            setValues((values: any) => {
                const form = forms[field]

                let newState: any
                if (typeof param === 'function') {
                    newState = param(form)
                } else {
                    newState = param
                }

                return { ...values, [name]: { ...values[name], ...newState } }
            })
        },
        [],
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

                const newStateErrors = Object.entries(newState).reduce((acc, [key, value]) => {
                    acc[`${name}.${key}`] = value
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
                <Tabs type={tabType} activeKey={activeTabKey} onChange={onTabChange}>
                    {languages.map(({ label, value }) => {
                        const formErrors = formsErrors[value] ?? {}

                        return (
                            <Tabs.TabPane tab={label} key={value}>
                                <Form.ChildForm
                                    values={{ [value]: forms?.[value] }}
                                    setValues={createSetValuesFn(value)}
                                    errors={formErrors}
                                    setErrors={createSetErrorsFn}
                                    {...formProps}
                                >
                                    <Component name={value} {...props} {...componentProps} />
                                </Form.ChildForm>
                            </Tabs.TabPane>
                        )
                    })}
                </Tabs>
            </Form.Item>
        </>
    )
}

TranslatableInput.inputName = 'TranslatableInput'

const getFormErrors = (
    errors: Record<string, string[]>,
    name: string,
): Record<string, Record<string, string[]>> => {
    // return
    // {
    //   childFilter : string[],
    //   childFilter: string[],
    // }

    return Object.entries(errors).reduce((acc, [key, value]) => {
        //filter.(childFilter)
        const reg = new RegExp(`^${name}\\.\(.+\)`)
        const match = key.match(reg)

        if (match) {
            const [, childFilter] = match
            acc[childFilter] = { [childFilter]: value }
        }

        return acc
    }, {} as Record<string, Record<string, string[]>>)
}
