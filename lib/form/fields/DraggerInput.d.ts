import React from 'react';
import { UploadProps } from '../../ui/Upload/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
export type DraggerInputProps = FormItemProps & {
    name: string;
    onChange?: (value: any) => void;
} & UploadProps;
export declare const DraggerInput: InputComponentWithName<(props: DraggerInputProps) => React.JSX.Element>;
