import type { TypographyProps } from './Typography';
export declare type BaseType = 'secondary' | 'success' | 'warning' | 'danger';
export interface BlockProps extends TypographyProps {
    title?: string;
    type?: BaseType;
    code?: boolean;
    mark?: boolean;
    underline?: boolean;
    delete?: boolean;
    strong?: boolean;
    italic?: boolean;
}
