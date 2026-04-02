import React from 'react';
import { InputProps } from './interfaces';
declare function Input({ ref, ...props }: InputProps & {
    ref?: React.Ref<HTMLInputElement>;
}): import("react/jsx-runtime").JSX.Element;
export declare function fixControlledValue<T>(value: T): string;
declare const _default: typeof Input;
export default _default;
