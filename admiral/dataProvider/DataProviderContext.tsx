import React, { createContext, useContext } from 'react'

import { DataProvider } from './interfaces'

const missingDataProvider = {} as DataProvider

export const DataProviderContext = createContext<DataProvider>(missingDataProvider)

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
    const dataProvider = useContext(DataProviderContext)
    if (dataProvider === missingDataProvider) {
        throw new Error(
            '[Admiral] useDataProvider must be used within <Admin> — no dataProvider found in context',
        )
    }
    return dataProvider
}
