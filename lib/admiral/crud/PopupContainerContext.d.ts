import React from 'react';
declare type PopupContainerValueType = () => HTMLElement;
export declare const PopupContainerContext: React.Context<PopupContainerValueType>;
export declare const PopupContainerContextProvider: React.FC<{
    value: PopupContainerValueType;
}>;
export declare function usePopupContainer(): PopupContainerValueType;
export {};
