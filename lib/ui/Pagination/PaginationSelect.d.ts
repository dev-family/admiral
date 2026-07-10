export declare function createSizeChangerRender(size: 'S' | 'XS'): (info: {
    disabled: boolean;
    size: number;
    onSizeChange: (value: string | number) => void;
    "aria-label": string;
    className: string;
    options: {
        label: string;
        value: string | number;
    }[];
}) => import("react/jsx-runtime").JSX.Element;
