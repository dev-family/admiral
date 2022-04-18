/// <reference types="react" />
declare const SpinSizes: ["small", "default", "large"];
export declare type SpinSizeType = typeof SpinSizes[number];
export declare type SpinIndicatorType = React.ReactElement<HTMLElement>;
export interface SpinProps {
    className?: string;
    spinning?: boolean;
    style?: React.CSSProperties;
    size?: SpinSizeType;
    tip?: React.ReactNode;
    delay?: number;
    wrapperClassName?: string;
}
export {};
