import React, { createContext, useContext } from 'react'

type DataTableValueType = { refresh: () => void }

export const DataTableContext = createContext<DataTableValueType>({ refresh: () => {} })

export const DataTableContextProvider: React.FC<{ value: DataTableValueType }> = ({
    value,
    children,
}) => {
    return <DataTableContext.Provider value={value}>{children}</DataTableContext.Provider>
}

export function useDataTable() {
    return useContext(DataTableContext)
}
