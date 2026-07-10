import React from 'react';
import type { UploadProps } from './interfaces.js';
export type DraggerProps = UploadProps & {
    height?: number;
};
export declare function Dragger({ ref, style, height, locale, children, ...restProps }: DraggerProps & {
    ref?: React.Ref<unknown>;
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare namespace Dragger {
    var displayName: string;
}
