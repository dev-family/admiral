import React from 'react';
import { UploadProps } from '../../ui/Upload/interfaces.js';
import { FormItemProps } from '../Item.js';
import { InputComponentWithName } from '../interfaces.js';
export type DraggerInputProps = FormItemProps & {
    name: string;
    onChange?: (value: any) => void;
} & UploadProps;
export declare const DraggerInput: InputComponentWithName<(props: DraggerInputProps) => React.JSX.Element>;
