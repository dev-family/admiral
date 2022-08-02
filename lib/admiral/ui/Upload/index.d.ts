/// <reference types="react" />
import { Upload as BaseUpload } from './Upload';
import { Dragger } from './Dragger';
import type { UploadProps } from './interfaces';
declare type InternalUploadType = typeof BaseUpload;
interface UploadInterface<T = any> extends InternalUploadType {
    <U extends T>(props: React.PropsWithChildren<UploadProps<U>> & React.RefAttributes<any>): React.ReactElement;
    Dragger: typeof Dragger;
}
export declare const Upload: UploadInterface<any>;
export {};
