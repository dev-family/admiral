import { createRef } from 'react'
import { describe, expect, test, vi } from 'vitest'
import { act, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Form, FormRef } from '../admiral/form/Form'

const renderForm = (submitData: (values: Record<string, unknown>) => Promise<unknown>) => {
    const ref = createRef<FormRef>()
    render(
        <MemoryRouter>
            <Form ref={ref} submitData={submitData}>
                <div />
            </Form>
        </MemoryRouter>,
    )
    return ref
}

describe('Form.handleSubmit', () => {
    test('resolves true on success', async () => {
        const ref = renderForm(vi.fn(async () => ({})))

        let result: boolean | undefined
        await act(async () => {
            result = await ref.current?.handleSubmit()
        })

        expect(result).toBe(true)
    })

    test('resolves false and survives a 422 without an errors body', async () => {
        const ref = renderForm(
            vi.fn(async () => {
                throw { response: { status: 422, data: {} } }
            }),
        )

        let result: boolean | undefined
        await act(async () => {
            result = await ref.current?.handleSubmit()
        })

        expect(result).toBe(false)
    })

    test('resolves false on a network error without response', async () => {
        const ref = renderForm(
            vi.fn(async () => {
                throw new Error('network down')
            }),
        )

        let result: boolean | undefined
        await act(async () => {
            result = await ref.current?.handleSubmit()
        })

        expect(result).toBe(false)
    })
})
