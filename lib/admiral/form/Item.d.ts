import React from 'react';
export interface FormItemProps {
    label?: string;
    error?: string;
    showError?: boolean;
    required?: boolean;
    columnSpan?: 1 | 2;
    onLabelClick?: React.MouseEventHandler<HTMLLabelElement>;
    labelAs?: string | React.JSXElementConstructor<any>;
    isQuickFilter?: boolean;
}
declare const Item: React.FC<FormItemProps>;
export default Item;
