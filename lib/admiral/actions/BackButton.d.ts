/// <reference types="react" />
import { ButtonProps } from '../ui/Button/interfaces'
export declare const BackButton: ({
    basePath,
    children,
    ...buttonProps
}: BackButtonProps) => JSX.Element
interface Props {
    basePath: string
}
export declare type BackButtonProps = Props & ButtonProps
export {}
