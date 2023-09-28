import React from 'react';
import type { EditorProps } from '../../ui/Editor/interfaces';
import { FormItemProps } from '../Item';
import { InputComponentWithName } from '../interfaces';
export interface EditorInputProps extends EditorProps, FormItemProps {
    name: string;
    onChange?: (value: any) => void;
}
export declare const EditorInput: InputComponentWithName<React.FC<EditorInputProps>>;
