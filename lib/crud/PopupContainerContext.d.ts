import React from 'react';
type PopupContainerValueType = () => HTMLElement;
export declare const PopupContainerContext: React.Context<PopupContainerValueType>;
export declare function PopupContainerContextProvider({ value, children, }: {
    value: PopupContainerValueType;
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function usePopupContainer(): PopupContainerValueType;
export {};
