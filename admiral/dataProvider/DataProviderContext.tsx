import React, { createContext, useContext } from 'react'

import { DataProvider } from './interfaces'

export const DataProviderContext = createContext<DataProvider>({} as DataProvider)

export function DataProviderContextProvider({
    value,
    children,
}: {
    value: DataProvider
    children?: React.ReactNode
}) {
    return <DataProviderContext.Provider value={value}>{children}</DataProviderContext.Provider>
}

export function useDataProvider() {
    return useContext(DataProviderContext)
}
