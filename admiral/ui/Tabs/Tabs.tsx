import React from 'react'
import RcTabs from 'rc-tabs'
import type { Tab } from 'rc-tabs/es/interface'
import { FiMoreHorizontal } from 'react-icons/fi'
import cn from 'classnames'
import { TabsProps, TabPaneProps } from './interfaces'
import { getPopupContainer } from '../../utils/helpers'
import styles from './Tabs.module.scss'

/**
 * Compatibility TabPane component.
 * rc-tabs v15 no longer supports children-based TabPane usage,
 * so we convert TabPane children into the `items` prop internally.
 */
function TabPane(_props: TabPaneProps & { children?: React.ReactNode }) {
    return null // Not rendered directly; props are extracted by Tabs
}

function childrenToItems(children: React.ReactNode): Tab[] {
    const items: Tab[] = []
    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return
        const {
            tab,
            children: paneChildren,
            ...rest
        } = child.props as TabPaneProps & {
            children?: React.ReactNode
        }
        items.push({
            key: (child.key as string) ?? '',
            label: tab,
            children: paneChildren,
            ...rest,
        })
    })
    return items
}

function InternalTabs({
    type,
    className,
    size,
    centered,
    columnSpan = 1,
    children,
    items: itemsProp,
    ...props
}: TabsProps & { children?: React.ReactNode }) {
    // Support both items prop (new) and children (legacy TabPane pattern)
    const items = itemsProp ?? (children ? childrenToItems(children) : undefined)

    return (
        <RcTabs
            {...props}
            items={items}
            className={cn(
                styles.tabs,
                {
                    [styles.tabs__Card]: type === 'card',
                    [styles.tabs__Centered]: centered,
                    [styles.tabs__SizeS]: size === 'S',
                    [styles.tabs__SizeL]: size === 'L',
                    [styles.tabs__ColumnSpanTwo]: columnSpan === 2,
                },
                className,
            )}
            more={{ icon: <FiMoreHorizontal /> }}
            prefixCls="tabs"
            getPopupContainer={getPopupContainer}
        />
    )
}

export const Tabs = InternalTabs as typeof InternalTabs & {
    TabPane: typeof TabPane
}

Tabs.TabPane = TabPane
