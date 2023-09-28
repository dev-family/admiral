import React from 'react';
import { UploadProps } from '../../ui/Upload/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
export declare type DraggerInputProps = FormItemProps & {
    name: string;
    onChange?: (value: any) => void;
} & UploadProps;
export declare const DraggerInput: InputComponentWithName<React.FC<DraggerInputProps>>;
