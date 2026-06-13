import React from 'react';
import { UploadProps } from '../../ui/Upload/interfaces.js';
import { FormItemProps } from '../Item.js';
import { FieldRuleProps } from '../fieldRules.js';
export type FilePictureInputProps = FormItemProps & FieldRuleProps & {
    name: string;
} & UploadProps;
export declare const FilePictureInput: (props: FilePictureInputProps) => React.JSX.Element | null;
