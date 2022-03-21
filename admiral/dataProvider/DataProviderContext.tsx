import React, { createContext, useContext } from 'react'

import { DataProvider } from './interfaces'

export const DataProviderContext = createContext<DataProvider>({} as DataProvider)

export const DataProviderContextProvider: React.FC<{ value: DataProvider }> = ({
    value,
    children,
}) => {
    return <DataProviderContext.Provider value={value}>{children}</DataProviderContext.Provider>
}

export function useDataProvider() {
    return useContext(DataProviderContext)
}
