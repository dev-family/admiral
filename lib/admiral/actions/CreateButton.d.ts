/// <reference types="react" />
import { ButtonProps } from '../ui/Button/interfaces';
export declare const CreateButton: ({ basePath, children }: CreateButtonProps) => JSX.Element;
interface Props {
    basePath?: string;
}
export declare type CreateButtonProps = Props & ButtonProps;
export {};
