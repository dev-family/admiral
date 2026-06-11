import { Upload as BaseUpload } from './Upload.js';
import { Dragger } from './Dragger.js';
import type { UploadProps } from './interfaces.js';
type InternalUploadType = typeof BaseUpload;
interface UploadInterface<T = any> extends InternalUploadType {
    <U extends T>(props: React.PropsWithChildren<UploadProps<U>> & React.RefAttributes<any>): React.ReactElement;
    Dragger: typeof Dragger;
}
export declare const Upload: UploadInterface;
export {};
