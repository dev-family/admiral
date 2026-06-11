import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { DataTable } from '../admiral/dataTable'
import { CrudIndexPageContextProvider } from '../admiral/crud/CrudIndexPageContext'
import { DataProviderContextProvider, DataProvider } from '../admiral/dataProvider'
import { TopLocationContextProvider } from '../admiral/router'
import { ThemeProvider } from '../admiral/theme'

const getList = vi.fn(async (_resource: string, _params: Record<string, any>) => ({
    items: [{ id: 1, name: 'Alpha' }],
    meta: { current_page: 1, per_page: 10, total: 1 },
}))

const dataProvider = { getList } as unknown as DataProvider

function LocationProbe() {
    const location = useLocation()
    return <div data-testid="search">{location.search}</div>
}

function Page() {
    const location = useLocation()
    return (
        <TopLocationContextProvider value={location}>
            <CrudIndexPageContextProvider>
                <DataTable
                    resource="users"
                    columns={[{ title: 'Name', dataIndex: 'name', key: 'name', sorter: true }]}
                />
            </CrudIndexPageContextProvider>
            <LocationProbe />
        </TopLocationContextProvider>
    )
}

describe('DataTable sorting', () => {
    test('header click writes flat sort to the url and to getList params', async () => {
        render(
            <MemoryRouter>
                <ThemeProvider>
                    <DataProviderContextProvider value={dataProvider}>
                        <Page />
                    </DataProviderContextProvider>
                </ThemeProvider>
            </MemoryRouter>,
        )

        await waitFor(() => expect(getList).toHaveBeenCalled())

        fireEvent.click(screen.getAllByText('Name')[0])

        await waitFor(() => {
            expect(screen.getByTestId('search').textContent).toContain('sort[name]=asc')
        })

        await waitFor(() => {
            const params = getList.mock.calls.at(-1)?.[1]
            expect(params?.sort).toEqual({ field: 'name', order: 'asc' })
        })
    })
})
