import React from 'react';
import type { InputProps } from '../../ui/Input/interfaces.js';
import { FormItemProps } from '../Item.js';
import { FieldRuleProps } from '../fieldRules.js';
export interface TextInputProps extends Omit<InputProps, 'onChange'>, FormItemProps, FieldRuleProps {
    name: string;
    onChange?: (value: string) => void;
}
export declare const TextInput: (props: TextInputProps) => React.JSX.Element | null;
