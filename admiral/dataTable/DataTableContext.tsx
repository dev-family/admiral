import React, { createContext, useContext } from 'react'

type DataTableValueType = { refresh: () => void }

export const DataTableContext = createContext<DataTableValueType>({ refresh: () => {} })

export function DataTableContextProvider({
    value,
    children,
}: {
    value: DataTableValueType
    children?: React.ReactNode
}) {
    return <DataTableContext.Provider value={value}>{children}</DataTableContext.Provider>
}

export function useDataTable() {
    return useContext(DataTableContext)
}
