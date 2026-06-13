import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { act, cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../admiral/theme'
import { Form, FormRef } from '../admiral/form/Form'
import { TextInput } from '../admiral/form/fields/TextInput'
import type { FormTabItem } from '../admiral/form/FormTabs'
import type { RuleInput } from '../admiral/form/rules'

const renderForm = (children: React.ReactNode) => {
    const ref = createRef<FormRef>()
    const { container } = render(
        <MemoryRouter>
            <ThemeProvider>
                <Form ref={ref}>{children}</Form>
            </ThemeProvider>
        </MemoryRouter>,
    )
    return { ref, container }
}

const setValues = async (ref: React.RefObject<FormRef | null>, values: Record<string, unknown>) => {
    await act(async () => {
        ref.current?.setValues(values)
    })
}

const input = (container: HTMLElement, name: string) =>
    container.querySelector<HTMLInputElement>(`input[name="${name}"]`)

// Climb from an input to its enclosing Form.Item root div:
// input → div.wrapper (Input) → div.item_Field → label → div.item
const fieldItem = (el: HTMLInputElement) =>
    el.parentElement!.parentElement!.parentElement!.parentElement!

describe('Form.When', () => {
    afterEach(cleanup)

    test('shows/hides a group of fields when a DSL rule flips', async () => {
        const { ref, container } = renderForm(
            <Form.Fields>
                <TextInput name="type" label="Type" />
                <Form.When rule={{ field: 'type', is: 'legal' }}>
                    <TextInput name="inn" label="INN" />
                    <TextInput name="kpp" label="KPP" />
                </Form.When>
            </Form.Fields>,
        )

        // Initial values are empty → rule false → group hidden.
        expect(input(container, 'inn')).toBeNull()
        expect(input(container, 'kpp')).toBeNull()

        await setValues(ref, { type: 'legal' })
        expect(input(container, 'inn')).not.toBeNull()
        expect(input(container, 'kpp')).not.toBeNull()

        await setValues(ref, { type: 'person' })
        expect(input(container, 'inn')).toBeNull()
        expect(input(container, 'kpp')).toBeNull()
    })

    test('accepts a function rule', async () => {
        const rule: RuleInput = (values) => values.type === 'legal'
        const { ref, container } = renderForm(
            <Form.Fields>
                <TextInput name="type" label="Type" />
                <Form.When rule={rule}>
                    <TextInput name="inn" label="INN" />
                </Form.When>
            </Form.Fields>,
        )

        expect(input(container, 'inn')).toBeNull()
        await setValues(ref, { type: 'legal' })
        expect(input(container, 'inn')).not.toBeNull()
    })

    test('nested When combine as AND — inner visible only when both rules hold', async () => {
        const { ref, container } = renderForm(
            <Form.Fields>
                <Form.When rule={{ field: 'a', is: true }}>
                    <Form.When rule={{ field: 'b', is: true }}>
                        <TextInput name="inner" label="Inner" />
                    </Form.When>
                </Form.When>
            </Form.Fields>,
        )

        await setValues(ref, { a: true, b: false })
        expect(input(container, 'inner')).toBeNull()

        await setValues(ref, { a: false, b: true })
        expect(input(container, 'inner')).toBeNull()

        await setValues(ref, { a: true, b: true })
        expect(input(container, 'inner')).not.toBeNull()
    })

    test('values of a hidden group persist across hide → show', async () => {
        const { ref, container } = renderForm(
            <Form.Fields>
                <TextInput name="type" label="Type" />
                <Form.When rule={{ field: 'type', is: 'legal' }}>
                    <TextInput name="inn" label="INN" />
                </Form.When>
            </Form.Fields>,
        )

        await setValues(ref, { type: 'legal', inn: '7701234567' })
        expect(input(container, 'inn')!.value).toBe('7701234567')

        // Hide the group, then show it again — the value typed earlier is intact.
        await setValues(ref, { type: 'person', inn: '7701234567' })
        expect(input(container, 'inn')).toBeNull()

        await setValues(ref, { type: 'legal', inn: '7701234567' })
        expect(input(container, 'inn')!.value).toBe('7701234567')
    })

    test('a visible When adds no DOM node between the grid and the fields', async () => {
        const { ref, container } = renderForm(
            <Form.Fields>
                <TextInput name="bare" label="Bare" />
                <Form.When rule={{ field: 'type', is: 'legal' }}>
                    <TextInput name="wrapped" label="Wrapped" />
                </Form.When>
            </Form.Fields>,
        )

        await setValues(ref, { type: 'legal' })

        const bare = fieldItem(input(container, 'bare')!)
        const wrapped = fieldItem(input(container, 'wrapped')!)

        // Both Form.Item roots are direct children of the same grid container:
        // a Fragment introduces no wrapper, so the wrapped field shares the
        // bare field's parent. A wrapper element would give it a different one.
        expect(wrapped.parentElement).toBe(bare.parentElement)
    })

    test('Form.Tabs discovers field names inside a When and badges its errors', async () => {
        const items: FormTabItem[] = [
            { key: 'main', label: 'Main', children: <TextInput name="name" label="Name" /> },
            {
                key: 'details',
                label: 'Details',
                children: (
                    <Form.When rule={{ field: 'type', is: 'legal' }}>
                        <TextInput name="inn" label="INN" />
                    </Form.When>
                ),
            },
        ]
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
        const ref = createRef<FormRef>()
        render(
            <MemoryRouter>
                <ThemeProvider>
                    <Form
                        ref={ref}
                        submitData={async () => {
                            throw {
                                response: { status: 422, data: { errors: { inn: ['Required'] } } },
                            }
                        }}
                    >
                        <Form.Tabs defaultActiveKey="main" items={items} />
                    </Form>
                </ThemeProvider>
            </MemoryRouter>,
        )

        // Open the When so `inn` is genuinely visible: a hidden field's 422
        // error is moved to _global by U4's partition (R12), which would defeat
        // the badge — this test exercises When *discovery*, so the field must
        // be visible for its error to stay inline and badge the tab.
        await act(async () => {
            ref.current?.setValues({ type: 'legal' })
        })
        await act(async () => {
            await ref.current?.handleSubmit()
        })

        // collectFieldNames recursed through Form.When (props.children) and
        // found `inn`, so the Details tab is badged and auto-selected.
        expect(screen.getByRole('tab', { name: /Details/ }).getAttribute('aria-selected')).toBe(
            'true',
        )
        expect(screen.getByText('1 error')).toBeTruthy()
        expect(warn).not.toHaveBeenCalled()
        warn.mockRestore()
    })
})
