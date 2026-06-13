import React from 'react';
import { UploadProps } from '../../ui/Upload/interfaces.js';
import { FormItemProps } from '../Item.js';
import { FieldRuleProps } from '../fieldRules.js';
export type DraggerInputProps = FormItemProps & Omit<FieldRuleProps, 'disabledWhen'> & {
    name: string;
    onChange?: (value: any) => void;
} & UploadProps;
export declare const DraggerInput: (props: DraggerInputProps) => React.JSX.Element | null;
