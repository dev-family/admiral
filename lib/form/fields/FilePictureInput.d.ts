import React from 'react';
import { UploadProps } from '../../ui/Upload/interfaces.js';
import { FormItemProps } from '../Item.js';
import { InputComponentWithName } from '../interfaces.js';
export type FilePictureInputProps = FormItemProps & {
    name: string;
} & UploadProps;
export declare const FilePictureInput: InputComponentWithName<(props: FilePictureInputProps) => React.JSX.Element>;
