import React from 'react';
import { TabsProps, TabPaneProps } from './interfaces';
/**
 * Compatibility TabPane component.
 * rc-tabs v15 no longer supports children-based TabPane usage,
 * so we convert TabPane children into the `items` prop internally.
 */
declare function TabPane(_props: TabPaneProps & {
    children?: React.ReactNode;
}): null;
declare function InternalTabs({ type, className, size, centered, columnSpan, children, items: itemsProp, ...props }: TabsProps & {
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare const Tabs: typeof InternalTabs & {
    TabPane: typeof TabPane;
};
export {};
