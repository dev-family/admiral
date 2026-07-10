import React from 'react';
import type { SwitchProps } from '../../ui/Switch/interfaces.js';
import { FormItemProps } from '../Item.js';
import { FieldRuleProps } from '../fieldRules.js';
export interface BooleanInputProps extends SwitchProps, FormItemProps, FieldRuleProps {
    name: string;
    onChange?: (value: boolean) => void;
}
export declare const BooleanInput: (props: BooleanInputProps) => React.JSX.Element | null;
