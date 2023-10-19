import React from 'react';
import { FormItemProps } from '../Item';
import type { IRecord as DataProviderRecord } from '../../dataProvider';
import { InputComponentWithName } from '../interfaces';
export interface ArrayInputProps extends FormItemProps {
    name: string;
    columnSpan?: 1 | 2;
    disableOrder?: boolean;
    disableRemove?: boolean;
    disableAdd?: boolean;
    children: React.ReactNode | ((item: DataProviderRecord, idx: number) => React.ReactNode);
    autoFocusOnAdd?: boolean;
}
export declare const ArrayInput: InputComponentWithName<React.FC<ArrayInputProps>>;
