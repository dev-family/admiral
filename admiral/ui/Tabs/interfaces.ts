import type { TabsProps as RcTabsProps } from 'rc-tabs'

export interface TabPaneProps {
    tab?: React.ReactNode
    className?: string
    style?: React.CSSProperties
    disabled?: boolean
    children?: React.ReactNode
    forceRender?: boolean
    closable?: boolean
    closeIcon?: React.ReactNode
}

export type TabsType = 'line' | 'card'
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left'

export type TabsSizeType = 'S' | 'M' | 'L'

export interface TabsProps extends Omit<RcTabsProps, 'editable' | 'direction' | 'locale'> {
    type?: TabsType
    size?: TabsSizeType
    centered?: boolean
    columnSpan?: 1 | 2
}
