import React from 'react';
import { CommonPickerMethods, SizeType } from './interfaces.js';
export declare const pickerPrefixCls = "admiral-picker";
export declare const pickerDropdownTransitionName = "admiral-picker-dropdown-slide-up";
export declare const pickerAllowClear: {
    clearIcon: import("react/jsx-runtime").JSX.Element;
};
export declare const pickerNavigationIcons: {
    prevIcon: import("react/jsx-runtime").JSX.Element;
    nextIcon: import("react/jsx-runtime").JSX.Element;
    superPrevIcon: import("react/jsx-runtime").JSX.Element;
    superNextIcon: import("react/jsx-runtime").JSX.Element;
};
export declare function getPickerClassName(options: {
    size?: SizeType;
    alert?: boolean;
    borderless?: boolean;
    className?: string;
}): string;
export declare function usePickerImperativeHandle<R extends CommonPickerMethods>(ref: React.Ref<CommonPickerMethods> | undefined, pickerRef: React.RefObject<R | null>): void;
