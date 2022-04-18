/// <reference types="react" />
export default function getIcons({ loading, multiple, prefixCls, }: {
    loading?: boolean;
    multiple?: boolean;
    prefixCls: string;
}): {
    clearIcon: JSX.Element;
    suffixIcon: JSX.Element | (({ open, showSearch }: {
        open: boolean;
        showSearch: boolean;
    }) => JSX.Element);
    itemIcon: JSX.Element | null;
    removeIcon: JSX.Element;
};
