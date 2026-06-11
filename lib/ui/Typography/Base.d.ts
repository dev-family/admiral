import React from 'react';
import { BlockProps } from './interfaces.js';
interface InternalBlockProps extends BlockProps {
    component: React.ElementType;
}
declare function Base({ ref, className, style, type, children, component, title: _title, ...restProps }: InternalBlockProps & {
    ref?: React.Ref<any>;
}): import("react/jsx-runtime").JSX.Element;
export default Base;
