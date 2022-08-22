/// <reference types="react" />
export declare const BadgeStatusTypes: ["success", "normal", "error", "system", "warning"];
export declare type BadgeStatusType = typeof BadgeStatusTypes[number];
export declare const BadgeSizeTypes: ["XS", "S", "M", "L"];
export declare type BadgeSizeType = typeof BadgeSizeTypes[number];
export declare const BadgeViewTypes: ["filled", "stroked"];
export declare type BadgeViewType = typeof BadgeViewTypes[number];
export interface BadgeProps {
    /** Number to show in badge */
    count?: React.ReactNode;
    showZero?: boolean;
    /** Max count to show */
    overflowCount?: number;
    /** Whether to show red dot without number */
    dot?: boolean;
    className?: string;
    status?: BadgeStatusType;
    view?: BadgeViewType;
    size?: BadgeSizeType;
    children?: React.ReactNode;
}
