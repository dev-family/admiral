import React from 'react';
import type { EditorProps } from '../../ui/Editor/interfaces';
import { FormItemProps } from '../Item';
export interface EditorInputProps extends EditorProps, FormItemProps {
    name: string;
}
export declare const EditorInput: React.FC<EditorInputProps>;
