import React from 'react';
import type { ColorPickerProps, ColorPickerResult } from '../../ui/ColorPicker/interfaces.js';
import { FormItemProps } from '../Item.js';
import { InputComponentWithName } from '../interfaces.js';
export interface ColorPickerInputProps extends ColorPickerProps, FormItemProps {
    name: string;
    outputValue?: keyof ColorPickerResult;
    onChange?: (value: any) => void;
}
export declare const ColorPickerInput: InputComponentWithName<(props: ColorPickerInputProps) => React.JSX.Element>;
