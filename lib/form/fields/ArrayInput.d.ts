import React from 'react';
import { FormItemProps } from '../Item.js';
import type { IRecord as DataProviderRecord } from '../../dataProvider/index.js';
import { FieldRuleProps } from '../fieldRules.js';
export interface ArrayInputProps extends Omit<FormItemProps, 'children'>, Omit<FieldRuleProps, 'disabledWhen' | 'requiredWhen'> {
    name: string;
    columnSpan?: 1 | 2;
    disableOrder?: boolean;
    disableRemove?: boolean;
    disableAdd?: boolean;
    children: React.ReactNode | ((item: DataProviderRecord, idx: number) => React.ReactNode);
}
export declare const ArrayInput: (props: ArrayInputProps) => React.JSX.Element | null;
