import type { TabsProps as RcTabsProps, TabPaneProps } from 'rc-tabs';
export type { TabPaneProps };
export declare type TabsType = 'line' | 'card';
export declare type TabsPosition = 'top' | 'right' | 'bottom' | 'left';
export declare type TabsSizeType = 'S' | 'M' | 'L';
export interface TabsProps extends Omit<RcTabsProps, 'editable' | 'direction' | 'locale'> {
    type?: TabsType;
    size?: TabsSizeType;
    centered?: boolean;
    columnSpan?: 1 | 2;
}
