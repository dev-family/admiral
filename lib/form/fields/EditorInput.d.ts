import React from 'react';
import type { EditorProps } from '../../ui/Editor/interfaces.js';
import { FormItemProps } from '../Item.js';
import { InputComponentWithName } from '../interfaces.js';
export interface EditorInputProps extends EditorProps, FormItemProps {
    name: string;
    onChange?: (value: any) => void;
}
export declare const EditorInput: InputComponentWithName<(props: EditorInputProps) => React.JSX.Element>;
