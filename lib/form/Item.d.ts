import React from 'react';
export interface FormItemProps {
    label?: string;
    error?: string;
    showError?: boolean;
    required?: boolean;
    columnSpan?: 1 | 2;
    onLabelClick?: React.MouseEventHandler<HTMLLabelElement>;
    labelAs?: string | React.JSXElementConstructor<any>;
    children?: React.ReactNode;
}
declare function Item({ label, required, error, showError, columnSpan, onLabelClick, labelAs: LabelComponent, children, }: FormItemProps): import("react/jsx-runtime").JSX.Element;
export default Item;
