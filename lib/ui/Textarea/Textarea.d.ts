import React from 'react';
import { TextareaProps } from './interfaces.js';
declare function Textarea({ ref, ...props }: TextareaProps & {
    ref?: React.Ref<HTMLTextAreaElement>;
}): import("react/jsx-runtime").JSX.Element;
export declare function fixControlledValue<T>(value: T): string;
declare const _default: typeof Textarea;
export default _default;
