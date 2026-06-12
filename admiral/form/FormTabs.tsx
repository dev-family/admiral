import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from './FormContext'
import { Badge, Tabs } from '../ui'
import type { TabsProps } from '../ui/Tabs/interfaces'
import styles from './FormTabs.module.scss'

export type FormTabItem = NonNullable<TabsProps['items']>[number] & {
    /**
     * Extends automatic discovery: names of the form fields the scan cannot
     * see — inputs rendered inside the body of another component. Discovered
     * fields do not need to be repeated here.
     */
    fields?: string[]
}

export type FormTabsProps = Omit<TabsProps, 'items'> & {
    items: FormTabItem[]
}

/**
 * Form-aware tabs: marks tabs whose fields have validation errors with a
 * badge and, when the active tab is clean, switches to the first tab that
 * has errors. Field names are discovered from each tab's element tree via
 * the `inputName` static that all admiral inputs carry.
 */
function FormTabs({ items, activeKey, defaultActiveKey, onChange, ...tabsProps }: FormTabsProps) {
    const { errors, locale } = useForm()

    const [innerActiveKey, setInnerActiveKey] = useState<string | undefined>(
        () => activeKey ?? defaultActiveKey ?? items[0]?.key,
    )
    const mergedActiveKey = activeKey ?? innerActiveKey

    const fieldsByTab = useMemo(
        () =>
            items.map((item) => {
                const discovered = collectFieldNames(item.children)
                return item.fields ? [...new Set([...discovered, ...item.fields])] : discovered
            }),
        [items],
    )
    const errorKeys = useMemo(
        () => Object.keys(errors).filter((key) => key !== '_global' && errors[key]?.length),
        [errors],
    )
    const errorCounts = useMemo(
        () =>
            fieldsByTab.map(
                (fields) =>
                    fields.filter((field) => errorKeys.some((key) => matchesField(key, field)))
                        .length,
            ),
        [fieldsByTab, errorKeys],
    )

    // Reacts to `errors` identity change only (i.e. a submit result):
    // re-running on every render would fight the user clicking through tabs.
    useEffect(() => {
        if (!errorKeys.length) return

        const unmatched = errorKeys.filter(
            (key) =>
                !fieldsByTab.some((fields) => fields.some((field) => matchesField(key, field))),
        )
        if (unmatched.length) {
            console.warn(
                `[Admiral] Form.Tabs: no tab matches the error keys ${unmatched
                    .map((key) => `"${key}"`)
                    .join(', ')}. ` +
                    'If these fields are rendered inside a tab by a component whose children ' +
                    'cannot be inspected, list them in the "fields" prop of that tab item.',
            )
        }

        const activeIndex = items.findIndex((item) => item.key === mergedActiveKey)
        if (errorCounts[activeIndex]) return
        const firstWithErrors = errorCounts.findIndex(Boolean)
        if (firstWithErrors === -1) return

        const key = items[firstWithErrors].key
        setInnerActiveKey(key)
        onChange?.(key)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors])

    const mergedItems = useMemo(
        () =>
            items.map((item, index) => {
                const { fields: _fields, ...tabItem } = item
                const count = errorCounts[index]
                if (!count) return tabItem
                return {
                    ...tabItem,
                    label: (
                        <span className={styles.label}>
                            <span className={styles.label_Alert}>{item.label}</span>
                            <span aria-hidden="true">
                                <Badge count={count} status="error" size="S" />
                            </span>
                            {locale.tabErrors && (
                                <span className={styles.srOnly}>{locale.tabErrors(count)}</span>
                            )}
                        </span>
                    ),
                }
            }),
        [items, errorCounts, locale],
    )

    const handleChange = (key: string) => {
        setInnerActiveKey(key)
        onChange?.(key)
    }

    return (
        <Tabs
            {...tabsProps}
            activeKey={mergedActiveKey}
            onChange={handleChange}
            items={mergedItems}
        />
    )
}

const matchesField = (errorKey: string, field: string) =>
    errorKey === field || errorKey.startsWith(`${field}.`)

function collectFieldNames(node: React.ReactNode, acc: string[] = []): string[] {
    React.Children.forEach(node, (child) => {
        if (!React.isValidElement(child)) return

        const props = child.props as { name?: unknown; children?: React.ReactNode }
        const inputName =
            typeof child.type === 'string'
                ? undefined
                : (child.type as { inputName?: unknown }).inputName
        if (typeof inputName === 'string' && typeof props.name === 'string') {
            acc.push(props.name)
        }

        collectFieldNames(props?.children, acc)
    })
    return acc
}

export default FormTabs
