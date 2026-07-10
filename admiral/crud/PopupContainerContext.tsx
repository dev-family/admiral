import React, { createContext, useContext } from 'react'
import { getPopupContainer } from '../utils/helpers'

type PopupContainerValueType = () => HTMLElement

export const PopupContainerContext = createContext<PopupContainerValueType>(getPopupContainer)

export function PopupContainerContextProvider({
    value,
    children,
}: {
    value: PopupContainerValueType
    children?: React.ReactNode
}) {
    return <PopupContainerContext.Provider value={value}>{children}</PopupContainerContext.Provider>
}

export function usePopupContainer() {
    return useContext(PopupContainerContext)
}
