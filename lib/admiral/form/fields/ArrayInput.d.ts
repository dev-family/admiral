import React from 'react';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
export interface ArrayInputProps extends FormItemProps {
    name: string;
    columnSpan?: 1 | 2;
    disableOrder?: boolean;
    disableRemove?: boolean;
    disableAdd?: boolean;
    children: React.ReactNode;
}
export declare const ArrayInput: InputComponentWithName<React.FC<ArrayInputProps>>;
