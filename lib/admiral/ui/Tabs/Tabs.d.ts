/// <reference types="react" />
import { TabPane } from 'rc-tabs';
import { TabsProps } from './interfaces';
declare function InternalTabs({ type, className, size, centered, columnSpan, ...props }: TabsProps): JSX.Element;
export declare const Tabs: typeof InternalTabs & {
    TabPane: typeof TabPane;
};
export {};
