import React from 'react';
export interface FormItemProps {
    label?: string;
    error?: string;
    required?: boolean;
    columnSpan?: 1 | 2;
    onLabelClick?: React.MouseEventHandler<HTMLLabelElement>;
}
declare const Item: React.FC<FormItemProps>;
export default Item;
