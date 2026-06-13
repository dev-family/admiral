import React, { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '../admiral/theme'
import { Form, FormRef } from '../admiral/form/Form'
import { TextInput as TextInputBase, type TextInputProps } from '../admiral/form/fields/TextInput'
import type { FormRulesMap, RuleInput } from '../admiral/form/rules'
import { enUS } from '../admiral/form/locale'
import { createCRUD } from '../admiral/crud'
import { DataProviderContextProvider, type DataProvider } from '../admiral/dataProvider'

afterEach(() => {
    cleanup()
    // Restore console spies but leave the global matchMedia stub (setup.ts) in
    // place — restoreAllMocks would otherwise strip it and break ThemeProvider.
    vi.restoreAllMocks()
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    })
})

const spyWarn = () => vi.spyOn(console, 'warn').mockImplementation(() => {})

/**
 * Field-level rule props (`visibleWhen` / `keepInPayload`) land on the field
 * types in U5; until then this re-types TextInput by reference (the runtime
 * component and its `inputName` static are untouched) so these tests drive
 * hiding through field props exactly as U5 consumers will. The no-keep cases
 * drive hiding through the Form `rules` map prop, which is fully live in U4.
 */
type RuleProps = {
    visibleWhen?: RuleInput
    keepInPayload?: boolean
}
const TextInput = TextInputBase as React.FC<TextInputProps & RuleProps>

const renderForm = (
    children: React.ReactNode,
    props?: Partial<React.ComponentProps<typeof Form>>,
) => {
    const ref = createRef<FormRef>()
    const { container } = render(
        <MemoryRouter>
            <ThemeProvider>
                <Form ref={ref} {...props}>
                    {children}
                </Form>
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

const submit = async (ref: React.RefObject<FormRef | null>) => {
    let result: boolean | undefined
    await act(async () => {
        result = await ref.current?.handleSubmit()
    })
    return result
}

describe('payload omission (AE2, AE4, R4, R5)', () => {
    test('AE2: a field hidden by the rules-map is omitted from the payload', async () => {
        const submitData = vi.fn(async (_values: Record<string, unknown>) => ({}))
        const rules: FormRulesMap = { inn: { visible: { field: 'type', is: 'legal' } } }
        const { ref } = renderForm(
            <Form.Fields>
                <TextInput name="type" label="Type" />
                <TextInput name="inn" label="INN" />
            </Form.Fields>,
            { submitData, rules },
        )

        await setValues(ref, { type: 'person', inn: '7701234567' })
        await submit(ref)

        const payload = submitData.mock.calls[0][0] as Record<string, unknown>
        expect('inn' in payload).toBe(false)
        expect(payload.type).toBe('person')
    })

    test('AE2: keepInPayload keeps a hidden field in the payload', async () => {
        const submitData = vi.fn(async (_values: Record<string, unknown>) => ({}))
        const { ref } = renderForm(
            <Form.Fields>
                <TextInput name="type" label="Type" />
                <TextInput
                    name="inn"
                    label="INN"
                    visibleWhen={{ field: 'type', is: 'legal' }}
                    keepInPayload
                />
            </Form.Fields>,
            { submitData },
        )

        await setValues(ref, { type: 'person', inn: '7701234567' })
        await submit(ref)

        const payload = submitData.mock.calls[0][0] as Record<string, unknown>
        expect(payload.inn).toBe('7701234567')
    })

    test('AE4: a field driven by the rules-map `disabled` (never hides) stays in the payload', async () => {
        const submitData = vi.fn(async (_values: Record<string, unknown>) => ({}))
        const rules: FormRulesMap = { inn: { disabled: { field: 'type', is: 'person' } } }
        const { ref } = renderForm(
            <Form.Fields>
                <TextInput name="type" label="Type" />
                <TextInput name="inn" label="INN" />
            </Form.Fields>,
            { submitData, rules },
        )

        await setValues(ref, { type: 'person', inn: '7701234567' })
        await submit(ref)

        const payload = submitData.mock.calls[0][0] as Record<string, unknown>
        // disabled ≠ hidden — the value is still submitted.
        expect(payload.inn).toBe('7701234567')
    })
})

describe('fast path (AE19, R18)', () => {
    test('a form with no rules submits the exact `values` object (reference identity)', async () => {
        let received: unknown
        const submitData = vi.fn(async (values: unknown) => {
            received = values
            return {}
        })
        const { ref } = renderForm(
            <Form.Fields>
                <TextInput name="a" label="A" />
                <TextInput name="b" label="B" />
            </Form.Fields>,
            { submitData },
        )

        const values = { a: '1', b: '2' }
        await setValues(ref, values)
        await submit(ref)

        // Same object the form holds in state — not a structural copy.
        expect(received).toBe(ref.current?.values)
        expect(received).toEqual(values)
    })
})

describe('422 partition (AE16, AE8-part, R12)', () => {
    test('hidden-field errors move to _global with a console.warn; visible stay inline', async () => {
        const warn = spyWarn()
        const submitData = vi.fn(async () => {
            throw {
                response: {
                    status: 422,
                    data: { errors: { visibleField: ['e1'], inn: ['e2'] } },
                },
            }
        })
        const rules: FormRulesMap = { inn: { visible: { field: 'type', is: 'legal' } } }
        const { ref } = renderForm(
            <Form.Fields>
                <TextInput name="type" label="Type" />
                <TextInput name="visibleField" label="Visible" />
                <TextInput name="inn" label="INN" />
            </Form.Fields>,
            { submitData, rules },
        )

        await setValues(ref, { type: 'person', visibleField: 'v', inn: 'x' })
        await submit(ref)

        // Visible field error is rendered inline (Form.Item error text).
        expect(screen.getByText('e1')).toBeTruthy()
        // Hidden field error is surfaced in _global (localized), not inline.
        expect(screen.getByText('e2 (hidden field "inn")')).toBeTruthy()
        // The raw inline "e2" must NOT be present (it moved to _global wrapped).
        expect(screen.queryByText('e2')).toBeNull()

        expect(warn).toHaveBeenCalledWith(expect.stringContaining('[Admiral]'))
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('inn'))
    })

    test('a 422 with no rules surfaces errors verbatim (no partition)', async () => {
        const submitData = vi.fn(async () => {
            throw { response: { status: 422, data: { errors: { name: ['Required'] } } } }
        })
        const { ref } = renderForm(
            <Form.Fields>
                <TextInput name="name" label="Name" />
            </Form.Fields>,
            { submitData },
        )

        await submit(ref)
        // Inline error rendered as today.
        expect(screen.getByText('Required')).toBeTruthy()
    })
})

describe('_global rendering (System-Wide Impact)', () => {
    test('a server _global plus a transferred hidden-field error render as multiple messages', async () => {
        const submitData = vi.fn(async () => {
            throw {
                response: {
                    status: 422,
                    data: { errors: { _global: ['g1'], inn: ['e2'] } },
                },
            }
        })
        const rules: FormRulesMap = { inn: { visible: { field: 'type', is: 'legal' } } }
        const { ref } = renderForm(
            <Form.Fields>
                <TextInput name="type" label="Type" />
                <TextInput name="inn" label="INN" />
            </Form.Fields>,
            { submitData, rules },
        )

        await setValues(ref, { type: 'person', inn: 'x' })
        await submit(ref)

        // Both the server _global and the transferred hidden-field message show.
        expect(screen.getByText('g1')).toBeTruthy()
        expect(screen.getByText('e2 (hidden field "inn")')).toBeTruthy()
    })
})

describe('snapshot semantics (KTD7/KTD8)', () => {
    test('a rule flipping mid-request classifies the 422 by the pre-submit snapshot', async () => {
        // At submit start `type:person` → `inn` hidden. submitData flips the rule
        // to `type:legal` (inn would now be VISIBLE) before throwing the 422.
        // The partition must still treat `inn` as hidden (snapshot wins).
        let setValuesRef: FormRef['setValues'] | null = null
        const submitData = vi.fn(async () => {
            // mutate the form mid-flight, between the snapshot and the catch
            await act(async () => {
                setValuesRef?.({ type: 'legal', inn: 'x' })
            })
            throw {
                response: { status: 422, data: { errors: { inn: ['e2'] } } },
            }
        })
        const rules: FormRulesMap = { inn: { visible: { field: 'type', is: 'legal' } } }
        const { ref } = renderForm(
            <Form.Fields>
                <TextInput name="type" label="Type" />
                <TextInput name="inn" label="INN" />
            </Form.Fields>,
            { submitData, rules },
        )

        await setValues(ref, { type: 'person', inn: 'x' })
        setValuesRef = ref.current!.setValues
        await submit(ref)

        // Classified hidden by the snapshot → moved to _global, not inline.
        expect(screen.getByText('e2 (hidden field "inn")')).toBeTruthy()
        expect(screen.queryByText('e2')).toBeNull()
    })
})

describe('ChildForm back-compat (R13)', () => {
    test('a Form.ChildForm with only the old prop set compiles and renders', () => {
        // The OLD prop set: no rules / hiddenFields / scannedFields / scopePath /
        // fieldChange — those are inherited from the parent context.
        const { container } = render(
            <MemoryRouter>
                <ThemeProvider>
                    <Form>
                        <Form.ChildForm
                            values={{ inn: '1' }}
                            setValues={vi.fn()}
                            options={{}}
                            setOptions={vi.fn()}
                            errors={{}}
                            setErrors={vi.fn()}
                            isFetching={false}
                            isSubmitting={false}
                            locale={enUS}
                        >
                            <TextInput name="inn" label="INN" />
                        </Form.ChildForm>
                    </Form>
                </ThemeProvider>
            </MemoryRouter>,
        )
        // The child field rendered with the row-scoped value.
        const innInput = container.querySelector<HTMLInputElement>('input[name="inn"]')
        expect(innInput).not.toBeNull()
        expect(innInput!.value).toBe('1')
    })
})

describe('CRUD config threads `form.create.rules` to the Form (AE2 via createCRUD)', () => {
    test('a field hidden by the create rules-map is omitted from the create-page payload', async () => {
        const create = vi.fn(async () => ({ data: { id: 1 } }))
        const getCreateFormData = vi.fn(async () => ({ data: {}, values: {} }))

        const dataProvider = {
            getCreateFormData,
            create,
        } as unknown as DataProvider

        const CRUD = createCRUD({
            path: '/widgets',
            resource: 'widgets',
            index: {
                title: 'Widgets',
                newButtonText: 'New',
                tableColumns: [],
            },
            create: { title: 'Create widget' },
            form: {
                create: {
                    fields: (
                        <>
                            <TextInput name="type" label="Type" />
                            <TextInput name="inn" label="INN" />
                        </>
                    ),
                    rules: { inn: { visible: { field: 'type', is: 'legal' } } },
                },
                edit: { fields: <TextInput name="type" label="Type" /> },
            },
        })

        const { CreatePage } = CRUD

        render(
            <MemoryRouter initialEntries={['/widgets/create']}>
                <ThemeProvider>
                    <DataProviderContextProvider value={dataProvider}>
                        <Routes>
                            <Route path="/widgets/create" element={<CreatePage />} />
                            <Route path="/widgets" element={<div>list</div>} />
                        </Routes>
                    </DataProviderContextProvider>
                </ThemeProvider>
            </MemoryRouter>,
        )

        // Wait for fetchInitialData to settle (enables the Submit button).
        await act(async () => {})

        // The CreatePage owns its own <Form> (no ref injectable), so drive it
        // through the DOM: type into the inputs, then click Submit.
        const typeInput = document.querySelector<HTMLInputElement>('input[name="type"]')!
        const innInput = document.querySelector<HTMLInputElement>('input[name="inn"]')!
        fireEvent.change(typeInput, { target: { value: 'person' } })
        fireEvent.change(innInput, { target: { value: '7701234567' } })

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
        })

        expect(create).toHaveBeenCalledTimes(1)
        // makeCreatePage calls create(resource, { data: payload }) — 2nd arg.
        const payload = (create.mock.calls[0] as unknown[])[1] as {
            data: Record<string, unknown>
        }
        // `form.create.rules` reached the Form → `inn` hidden → omitted.
        expect('inn' in payload.data).toBe(false)
        expect(payload.data.type).toBe('person')
    })
})
