import React from 'react'
import { describe, expect, test } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import useUrlState from '../admiral/utils/hooks/useUrlState'

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>{children}</MemoryRouter>
)

describe('useUrlState', () => {
    test('round-trips filter values with &, =, #, + and cyrillic', () => {
        const filter = {
            name: 'Tom & Jerry',
            formula: 'a=b',
            tag: '#1',
            tz: '2024-01-01T00:00:00+03:00',
            city: 'Москва',
        }
        const { result } = renderHook(() => useUrlState({ filter: {} }), { wrapper })

        act(() => {
            result.current[1]({ filter })
        })

        expect(result.current[0].filter).toEqual(filter)
    })

    test('decodes + as space in externally crafted urls', () => {
        const externalUrlWrapper = ({ children }: { children: React.ReactNode }) => (
            <MemoryRouter initialEntries={['/?filter[name]=John+Doe']}>{children}</MemoryRouter>
        )
        const { result } = renderHook(() => useUrlState({ filter: {} }), {
            wrapper: externalUrlWrapper,
        })

        expect(result.current[0].filter).toEqual({ name: 'John Doe' })
    })

    test('keeps unrelated keys on partial update', () => {
        const { result } = renderHook(
            () =>
                useUrlState<{ page: string; filter: Record<string, unknown> }>({
                    page: '1',
                    filter: {},
                }),
            { wrapper },
        )

        act(() => {
            result.current[1]({ filter: { name: 'x' } })
        })
        act(() => {
            result.current[1]({ page: '2' })
        })

        expect(result.current[0].filter).toEqual({ name: 'x' })
        expect(result.current[0].page).toBe('2')
    })
})
