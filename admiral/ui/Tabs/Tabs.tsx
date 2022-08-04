import React, { useCallback } from 'react'
import RcTabs, { TabPane } from 'rc-tabs'
import { FiMoreHorizontal } from 'react-icons/fi'
import cn from 'classnames'
import { TabsProps } from './interfaces'
import styles from './Tabs.module.scss'

function InternalTabs({ type, className, size, centered, ...props }: TabsProps) {
    const getPopupContainer = useCallback(
        () => document.querySelector('#root > .Theme') as HTMLDivElement,
        [],
    )

    return (
        <RcTabs
            moreTransitionName="tabs-dropdown-slide-up"
            {...props}
            className={cn(
                styles.tabs,
                {
                    [styles.tabs__Card]: type === 'card',
                    [styles.tabs__Centered]: centered,
                    [styles.tabs__SizeS]: size === 'S',
                    [styles.tabs__SizeL]: size === 'L',
                },
                className,
            )}
            moreIcon={<FiMoreHorizontal />}
            prefixCls="tabs"
            getPopupContainer={getPopupContainer}
        />
    )
}

export const Tabs = InternalTabs as typeof InternalTabs & {
    TabPane: typeof TabPane
}

Tabs.TabPane = TabPane
