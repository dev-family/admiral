import React from 'react';
import { FormItemProps } from '../Item.js';
import type { RadioGroupProps } from '../../ui/Radio/interfaces.js';
import { FieldRuleProps } from '../fieldRules.js';
export interface RadioInputProps extends RadioGroupProps, FormItemProps, FieldRuleProps {
    name: string;
    onChange?: (value: any) => void;
}
export declare const RadioInput: (props: RadioInputProps) => React.JSX.Element | null;
