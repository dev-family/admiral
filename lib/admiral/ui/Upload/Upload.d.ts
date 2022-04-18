import React from 'react';
import { UploadProps } from './interfaces';
export declare const Upload: (<T>(props: UploadProps<T> & {
    children?: React.ReactNode;
} & React.RefAttributes<any>) => React.ReactElement) & {
    defaultProps?: Partial<UploadProps<any>> | undefined;
    displayName?: string | undefined;
};
