import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { act, cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../admiral/theme'
import { Form, FormRef } from '../admiral/form/Form'
import { TextInput } from '../admiral/form/fields/TextInput'
import type { FormTabItem } from '../admiral/form/FormTabs'

const defaultItems = (): FormTabItem[] => [
    { key: 'main', label: 'Main', children: <TextInput label="Name" name="name" /> },
    { key: 'details', label: 'Details', children: <TextInput label="Bio" name="bio" /> },
]

const renderTabbedForm = (errors: Record<string, string[]>, items: FormTabItem[]) => {
    const ref = createRef<FormRef>()
    render(
        <MemoryRouter>
            <ThemeProvider>
                <Form
                    ref={ref}
                    submitData={async () => {
                        throw { response: { status: 422, data: { errors } } }
                    }}
                >
                    <Form.Tabs defaultActiveKey="main" items={items} />
                </Form>
            </ThemeProvider>
        </MemoryRouter>,
    )
    return ref
}

const submit = async (ref: React.RefObject<FormRef | null>) => {
    await act(async () => {
        await ref.current?.handleSubmit()
    })
}

const tabSelected = (name: RegExp) =>
    screen.getByRole('tab', { name }).getAttribute('aria-selected')

describe('Form.Tabs', () => {
    afterEach(cleanup)

    test('switches to the tab with errors and marks it with a badge', async () => {
        const ref = renderTabbedForm({ bio: ['Required'] }, defaultItems())

        expect(tabSelected(/Main/)).toBe('true')
        await submit(ref)

        expect(tabSelected(/Details/)).toBe('true')
        expect(screen.getByText('1 error')).toBeTruthy()
    })

    test('stays on the active tab when it has errors of its own', async () => {
        const ref = renderTabbedForm({ name: ['Required'], bio: ['Required'] }, defaultItems())

        await submit(ref)

        expect(tabSelected(/Main/)).toBe('true')
        expect(screen.getAllByText('1 error')).toHaveLength(2)
    })

    test('counts nested error keys (name.*) toward the parent field', async () => {
        const ref = renderTabbedForm(
            { 'bio.en': ['Required'], 'bio.ru': ['Required'] },
            defaultItems(),
        )

        await submit(ref)

        expect(tabSelected(/Details/)).toBe('true')
        expect(screen.getByText('1 error')).toBeTruthy()
    })

    test('the fields prop extends discovery with inputs it cannot see', async () => {
        const Opaque = () => <TextInput label="Bio" name="bio" />
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
        const items: FormTabItem[] = [
            ...defaultItems().slice(0, 1),
            {
                key: 'details',
                label: 'Details',
                fields: ['bio'],
                children: (
                    <>
                        <TextInput label="City" name="city" />
                        <Opaque />
                    </>
                ),
            },
        ]
        const ref = renderTabbedForm({ bio: ['Required'], city: ['Required'] }, items)

        await submit(ref)

        expect(tabSelected(/Details/)).toBe('true')
        // city is discovered, bio comes from `fields` — both are counted
        expect(screen.getByText('2 errors')).toBeTruthy()
        expect(warn).not.toHaveBeenCalled()
        warn.mockRestore()
    })

    test('warns when error keys match no tab', async () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
        const ref = renderTabbedForm({ surname: ['Required'] }, defaultItems())

        await submit(ref)

        expect(tabSelected(/Main/)).toBe('true')
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('"surname"'))
        warn.mockRestore()
    })
})
