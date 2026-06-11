import React from 'react';
import type { TextareaProps } from '../../ui/Textarea/interfaces.js';
import { FormItemProps } from '../Item.js';
import { InputComponentWithName } from '../interfaces.js';
export interface MultilineTextInputProps extends Omit<TextareaProps, 'onChange'>, FormItemProps {
    name: string;
    onChange?: (value: string) => void;
}
export declare const MultilineTextInput: InputComponentWithName<(props: MultilineTextInputProps) => React.JSX.Element>;
