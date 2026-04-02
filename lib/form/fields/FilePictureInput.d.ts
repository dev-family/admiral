import React from 'react';
import { UploadProps } from '../../ui/Upload/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
export type FilePictureInputProps = FormItemProps & {
    name: string;
} & UploadProps;
export declare const FilePictureInput: InputComponentWithName<(props: FilePictureInputProps) => React.JSX.Element>;
