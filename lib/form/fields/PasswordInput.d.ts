import React from 'react';
import type { InputProps } from '../../ui/Input/interfaces.js';
import { FormItemProps } from '../Item.js';
import { FieldRuleProps } from '../fieldRules.js';
export interface PasswordInputProps extends Omit<InputProps, 'onChange'>, FormItemProps, FieldRuleProps {
    name: string;
    onChange?: (value: string) => void;
}
export declare const PasswordInput: (props: PasswordInputProps) => React.JSX.Element | null;
