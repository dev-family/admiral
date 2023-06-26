import React from 'react';
import { UploadProps } from '../../ui/Upload/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
export declare type FilePictureInputProps = FormItemProps & {
    name: string;
} & UploadProps;
export declare const FilePictureInput: InputComponentWithName<React.FC<FilePictureInputProps>>;
