import React from 'react';
export interface TypographyProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
interface InternalTypographyProps extends TypographyProps {
    component?: string;
}
declare const _default: React.ForwardRefExoticComponent<InternalTypographyProps & React.RefAttributes<unknown>>;
export default _default;
