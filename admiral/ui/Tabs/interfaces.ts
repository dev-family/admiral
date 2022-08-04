import type { TabsProps as RcTabsProps, TabPaneProps } from 'rc-tabs'

export type { TabPaneProps }

export type TabsType = 'line' | 'card'
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left'

export type TabsSizeType = 'S' | 'M' | 'L'

export interface TabsProps extends Omit<RcTabsProps, 'editable' | 'direction' | 'locale'> {
    type?: TabsType
    size?: TabsSizeType
    centered?: boolean
}
