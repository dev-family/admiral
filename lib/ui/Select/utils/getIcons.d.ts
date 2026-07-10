export default function getIcons({ loading, multiple, prefixCls, }: {
    loading?: boolean;
    multiple?: boolean;
    prefixCls: string;
}): {
    clearIcon: import("react/jsx-runtime").JSX.Element;
    suffixIcon: import("react/jsx-runtime").JSX.Element | (({ open, showSearch }: {
        open: boolean;
        showSearch: boolean;
    }) => import("react/jsx-runtime").JSX.Element);
    itemIcon: import("react/jsx-runtime").JSX.Element | null;
    removeIcon: import("react/jsx-runtime").JSX.Element;
};
