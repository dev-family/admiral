import React from 'react';
import { UploadProps } from './interfaces';
export declare const Upload: (<T>(props: React.PropsWithChildren<UploadProps<T>> & {
    ref?: React.Ref<any>;
}) => React.ReactElement) & {
    displayName?: string;
};
