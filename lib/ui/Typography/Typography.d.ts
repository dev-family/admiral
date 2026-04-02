import React from 'react';
export interface TypographyProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
interface InternalTypographyProps extends TypographyProps {
    component?: React.ElementType;
}
declare function Typography({ component, className, children, ref, ...restProps }: InternalTypographyProps & {
    ref?: React.Ref<HTMLElement>;
}): import("react/jsx-runtime").JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Typography>;
export default _default;
