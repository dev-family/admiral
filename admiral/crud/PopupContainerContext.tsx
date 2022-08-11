import React, { createContext, useContext } from 'react'

type PopupContainerValueType = () => HTMLElement

export const PopupContainerContext = createContext<PopupContainerValueType>(
    () => document.querySelector('#root > .Theme') as HTMLElement,
)

export const PopupContainerContextProvider: React.FC<{ value: PopupContainerValueType }> = ({
    value,
    children,
}) => {
    return <PopupContainerContext.Provider value={value}>{children}</PopupContainerContext.Provider>
}

export function usePopupContainer() {
    return useContext(PopupContainerContext)
}
