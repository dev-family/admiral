import React from 'react';
export interface ScrollNumberProps {
    className?: string;
    count?: string | number | null;
    children?: React.ReactElement<HTMLElement>;
    component?: string;
    style?: any;
    show: boolean;
}
export interface ScrollNumberState {
    animateStarted?: boolean;
    count?: string | number | null;
}
declare const ScrollNumber: React.FC<ScrollNumberProps>;
export default ScrollNumber;
