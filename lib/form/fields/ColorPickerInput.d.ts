import React from 'react';
import type { ColorPickerProps, ColorPickerResult } from '../../ui/ColorPicker/interfaces.js';
import { FormItemProps } from '../Item.js';
import { FieldRuleProps } from '../fieldRules.js';
export interface ColorPickerInputProps extends ColorPickerProps, FormItemProps, FieldRuleProps {
    name: string;
    outputValue?: keyof ColorPickerResult;
    onChange?: (value: any) => void;
}
export declare const ColorPickerInput: (props: ColorPickerInputProps) => React.JSX.Element | null;
