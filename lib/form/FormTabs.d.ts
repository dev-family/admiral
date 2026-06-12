import type { TabsProps } from '../ui/Tabs/interfaces.js';
export type FormTabItem = NonNullable<TabsProps['items']>[number] & {
    /**
     * Extends automatic discovery: names of the form fields the scan cannot
     * see — inputs rendered inside the body of another component. Discovered
     * fields do not need to be repeated here.
     */
    fields?: string[];
};
export type FormTabsProps = Omit<TabsProps, 'items'> & {
    items: FormTabItem[];
};
/**
 * Form-aware tabs: marks tabs whose fields have validation errors with a
 * badge and, when the active tab is clean, switches to the first tab that
 * has errors. Field names are discovered from each tab's element tree via
 * the `inputName` static that all admiral inputs carry.
 */
declare function FormTabs({ items, activeKey, defaultActiveKey, onChange, ...tabsProps }: FormTabsProps): import("react/jsx-runtime").JSX.Element;
export default FormTabs;
