import React from 'react';
import type { TextareaProps } from '../../ui/Textarea/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
export interface MultilineTextInputProps extends TextareaProps, FormItemProps {
    name: string;
}
export declare const MultilineTextInput: InputComponentWithName<React.FC<MultilineTextInputProps>>;
