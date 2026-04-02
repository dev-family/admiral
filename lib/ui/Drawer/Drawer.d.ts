import React from 'react';
import type { DrawerProps } from './interfaces';
export type DrawerRef = {
    bodyElement: () => HTMLElement;
};
export declare function Drawer({ ref, visible, onClose, resetScrollPositionOnClose, getContainer: customizeGetContainer, bodyWrapperStyle, bodyStyle, headerStyle, footer, footerStyle, closable, title, width, height, placement, showMask, maskClosable, keyboard, afterVisibleChange, children, ...restProps }: DrawerProps & {
    ref?: React.Ref<DrawerRef>;
}): import("react/jsx-runtime").JSX.Element;
