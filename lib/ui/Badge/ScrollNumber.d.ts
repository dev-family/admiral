import React from 'react';
export interface ScrollNumberProps {
    className?: string;
    count?: string | number | null;
    children?: React.ReactElement;
    component?: string;
    style?: any;
    show: boolean;
}
export interface ScrollNumberState {
    animateStarted?: boolean;
    count?: string | number | null;
}
declare function ScrollNumber({ count, className, style, show: _show, component: _component, children, ...restProps }: ScrollNumberProps): import("react/jsx-runtime").JSX.Element;
export default ScrollNumber;
