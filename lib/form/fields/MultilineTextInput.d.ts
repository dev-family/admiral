import React from 'react';
import type { TextareaProps } from '../../ui/Textarea/interfaces.js';
import { FormItemProps } from '../Item.js';
import { FieldRuleProps } from '../fieldRules.js';
export interface MultilineTextInputProps extends Omit<TextareaProps, 'onChange'>, FormItemProps, FieldRuleProps {
    name: string;
    onChange?: (value: string) => void;
}
export declare const MultilineTextInput: (props: MultilineTextInputProps) => React.JSX.Element | null;
