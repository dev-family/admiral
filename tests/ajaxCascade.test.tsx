import React, { StrictMode, createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { act, cleanup, fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../admiral/theme'
import { Form, FormRef } from '../admiral/form/Form'
import { SelectInput } from '../admiral/form/fields/SelectInput'
import { AjaxSelectInput } from '../admiral/form/fields/AjaxSelectInput'
import { ArrayInput } from '../admiral/form/fields/ArrayInput'
import { useForm } from '../admiral/form/FormContext'
import type { OptionType } from '../admiral/dataProvider'

/**
 * U6 — cascade selects (`resetOnChangeOf` + `fetchOptions(values)`).
 *
 * Parents are real `SelectInput`s so a change flows through the field HOC's
 * wrapped `onChange` → `fieldChange.notify`, exactly as in production (KTD9):
 * `notify` fires synchronously before the parent's `setValues` is applied, which
 * is what the event-value overlay in the cascade handler defends against (AE6).
 */

const renderForm = (
    children: React.ReactNode,
    props?: Partial<React.ComponentProps<typeof Form>>,
    options?: { strict?: boolean },
) => {
    const ref = createRef<FormRef>()
    const tree = (
        <MemoryRouter>
            <ThemeProvider>
                <Form ref={ref} {...props}>
                    {children}
                </Form>
            </ThemeProvider>
        </MemoryRouter>
    )
    const { container } = render(options?.strict ? <StrictMode>{tree}</StrictMode> : tree)
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

/** All `.select` comboboxes in document order (one per rendered SelectInput). */
const comboboxes = (container: HTMLElement) =>
    Array.from(container.querySelectorAll<HTMLElement>('.select input'))

/**
 * Drive a real operator selection: open the `comboboxIndex`-th select and click
 * the `optionIndex`-th option of its (now open) dropdown. rc-select keeps only
 * the one open dropdown mounted, so any previously open dropdown is closed first
 * (Escape) to guarantee the options we click belong to the target select.
 */
const selectOption = async (container: HTMLElement, comboboxIndex: number, optionIndex: number) => {
    const all = comboboxes(container)
    // Close any currently-open dropdown so its options can't be clicked by mistake.
    await act(async () => {
        all.forEach((cb) => fireEvent.keyDown(cb, { key: 'Escape', keyCode: 27 }))
    })
    const combobox = all[comboboxIndex]
    await act(async () => {
        fireEvent.mouseDown(combobox)
    })
    const items = document.querySelectorAll<HTMLElement>('.select-item-option')
    await act(async () => {
        fireEvent.click(items[optionIndex])
    })
}

const flush = async () => {
    await act(async () => {
        await Promise.resolve()
    })
}

const opts = (...labels: string[]): OptionType[] =>
    labels.map((label) => ({ value: label.toLowerCase(), label }))

type FetchOptions = (
    field: string,
    query?: string,
    values?: Record<string, any>,
) => Promise<OptionType[]>

/** A typed `fetchOptions` mock, so `mock.calls[n]` is the `[field, query, values]` tuple. */
const fetchMock = (impl: FetchOptions = async () => []) => vi.fn<FetchOptions>(impl)

/**
 * Dispatches a parent change exactly as the field HOC does (KTD9): `notify`
 * fires synchronously, THEN `setValues` is applied. Used where a single rendered
 * AjaxSelect is wanted (rc-select reuses one dropdown id, so two open selects
 * cross-contaminate the queried options); driving the bus avoids a second
 * rc-select without weakening the contract under test.
 */
const BusDriver = ({
    onReady,
}: {
    onReady: (drive: (path: string, value: unknown) => void) => void
}) => {
    const { setValues, fieldChange } = useForm()
    React.useEffect(() => {
        onReady((path, value) => {
            fieldChange?.notify({ path, value })
            setValues((v: Record<string, unknown>) => ({ ...v, [path]: value }))
        })
    }, [fieldChange, setValues, onReady])
    return null
}

afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    vi.useRealTimers()
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

describe('AE5: initial load (fetchInitialData) does NOT reset or refetch', () => {
    test('seeding country+city via FormRef.setValues fires no city fetch', async () => {
        const fetchCity = fetchMock(async () => opts('Moscow', 'Kazan'))
        const { ref } = renderForm(
            <Form.Fields>
                <SelectInput name="country" label="Country">
                    <SelectInput.Option value="ru">Russia</SelectInput.Option>
                    <SelectInput.Option value="us">USA</SelectInput.Option>
                </SelectInput>
                <AjaxSelectInput
                    name="city"
                    label="City"
                    resetOnChangeOf={['country']}
                    fetchOptions={fetchCity}
                />
            </Form.Fields>,
        )

        // Simulate an edit form hydrated by fetchInitialData (goes through
        // setValues, not any field's onChange → the bus never fires).
        await setValues(ref, { country: 'ru', city: 'moscow' })
        await flush()

        expect(fetchCity).not.toHaveBeenCalled()
        expect(ref.current?.values.city).toBe('moscow')
    })
})

describe('AE6: changing country resets city and refetches with the NEW country', () => {
    test('city → null, options refetched, fetchOptions gets values.country = new value', async () => {
        const fetchCity = fetchMock(async () => opts('Moscow'))
        const { ref, container } = renderForm(
            <Form.Fields>
                <SelectInput name="country" label="Country">
                    <SelectInput.Option value="ru">Russia</SelectInput.Option>
                    <SelectInput.Option value="us">USA</SelectInput.Option>
                </SelectInput>
                <AjaxSelectInput
                    name="city"
                    label="City"
                    resetOnChangeOf={['country']}
                    fetchOptions={fetchCity}
                />
            </Form.Fields>,
        )

        // Seed an already-chosen country+city (edit form), no fetch yet.
        await setValues(ref, { country: 'ru', city: 'spb' })
        expect(fetchCity).not.toHaveBeenCalled()

        // Operator picks USA (index 1) → city resets, options refetch.
        await selectOption(container, 0, 1)
        await flush()

        expect(ref.current?.values.city).toBeNull()
        expect(fetchCity).toHaveBeenCalledTimes(1)
        // The 3rd arg is the scope snapshot with the NEW country overlaid — the
        // stale-snapshot-overlay regression guard.
        const [field, query, values] = fetchCity.mock.calls[0]
        expect(field).toBe('city')
        expect(query).toBe('')
        expect((values as Record<string, unknown>).country).toBe('us')
    })
})

describe('AE13: country→region→city chain cascades, then terminates', () => {
    test('changing country resets both region and city; re-change terminates the notify', async () => {
        const fetchRegion = fetchMock(async () => opts('Center', 'North'))
        const fetchCity = fetchMock(async () => opts('Moscow', 'Tver'))
        const { ref, container } = renderForm(
            <Form.Fields>
                <SelectInput name="country" label="Country">
                    <SelectInput.Option value="ru">Russia</SelectInput.Option>
                    <SelectInput.Option value="us">USA</SelectInput.Option>
                </SelectInput>
                <AjaxSelectInput
                    name="region"
                    label="Region"
                    resetOnChangeOf={['country']}
                    fetchOptions={fetchRegion}
                />
                <AjaxSelectInput
                    name="city"
                    label="City"
                    resetOnChangeOf={['region']}
                    fetchOptions={fetchCity}
                />
            </Form.Fields>,
        )

        // Seed a full chain (edit form).
        await setValues(ref, { country: 'ru', region: 'center', city: 'moscow' })
        expect(fetchRegion).not.toHaveBeenCalled()
        expect(fetchCity).not.toHaveBeenCalled()

        // Change country → region resets (non-empty) → notifies region path →
        // city resets down the chain. Both refetch.
        await selectOption(container, 0, 1)
        await flush()

        expect(ref.current?.values.region).toBeNull()
        expect(ref.current?.values.city).toBeNull()
        expect(fetchRegion).toHaveBeenCalledTimes(1)
        expect(fetchCity).toHaveBeenCalledTimes(1)
        // The chained city refetch saw region overlaid to null (the notify value).
        expect((fetchCity.mock.calls[0][2] as Record<string, unknown>).region).toBeNull()

        fetchRegion.mockClear()
        fetchCity.mockClear()

        // Change country AGAIN while region/city are already empty: region
        // refetches, but its value is already empty → no cascade notify → city
        // is NOT touched and does NOT refetch (termination).
        await selectOption(container, 0, 0)
        await flush()

        expect(fetchRegion).toHaveBeenCalledTimes(1)
        expect(fetchCity).not.toHaveBeenCalled()
    })
})

describe('AE14: after a reset, submit sends city: null (key present)', () => {
    test('payload contains an explicit null city', async () => {
        const submitData = vi.fn(async (_v: Record<string, unknown>) => ({}))
        const fetchCity = fetchMock(async () => opts('Moscow'))
        const { ref, container } = renderForm(
            <Form.Fields>
                <SelectInput name="country" label="Country">
                    <SelectInput.Option value="ru">Russia</SelectInput.Option>
                    <SelectInput.Option value="us">USA</SelectInput.Option>
                </SelectInput>
                <AjaxSelectInput
                    name="city"
                    label="City"
                    resetOnChangeOf={['country']}
                    fetchOptions={fetchCity}
                />
            </Form.Fields>,
            { submitData },
        )

        await setValues(ref, { country: 'ru', city: 'spb' })
        await selectOption(container, 0, 1)
        await flush()

        await submit(ref)
        const payload = submitData.mock.calls[0][0] as Record<string, unknown>
        expect('city' in payload).toBe(true)
        expect(payload.city).toBeNull()
        // JSON.stringify keeps an explicit null (the reason we write null, not
        // undefined): the backend sees the reset rather than the stale value.
        expect(JSON.parse(JSON.stringify(payload)).city).toBeNull()
    })
})

describe('AE15: ArrayInput rows are scope-isolated', () => {
    test("changing row 0's country does not touch row 1's city", async () => {
        const fetchCity = fetchMock(async () => opts('Moscow'))
        const { ref, container } = renderForm(
            <Form.Fields>
                <ArrayInput name="rows" label="Rows">
                    <SelectInput name="country" label="Country">
                        <SelectInput.Option value="ru">Russia</SelectInput.Option>
                        <SelectInput.Option value="us">USA</SelectInput.Option>
                    </SelectInput>
                    <AjaxSelectInput
                        name="city"
                        label="City"
                        resetOnChangeOf={['country']}
                        fetchOptions={fetchCity}
                    />
                </ArrayInput>
            </Form.Fields>,
        )

        await setValues(ref, {
            rows: [
                { country: 'ru', city: 'spb' },
                { country: 'us', city: 'nyc' },
            ],
        })

        // Comboboxes in document order: [row0.country, row0.city, row1.country,
        // row1.city]. Change row 0's country (index 0) to USA.
        await selectOption(container, 0, 1)
        await flush()

        const rows = ref.current?.values.rows as Array<Record<string, unknown>>
        expect(rows[0].city).toBeNull() // row 0 reset
        expect(rows[1].city).toBe('nyc') // row 1 untouched
        // Only row 0's city refetched.
        expect(fetchCity).toHaveBeenCalledTimes(1)
        expect((fetchCity.mock.calls[0][2] as Record<string, unknown>).country).toBe('us')
    })
})

describe('Race: a pending debounced search is dropped when the parent changes', () => {
    test('stale search response is discarded; options come from the new refetch', async () => {
        vi.useFakeTimers()
        // city fetch resolves on the next microtask but returns parent-specific
        // options so we can tell which call won.
        const fetchCity = fetchMock(async (_field, query, values) => {
            if (query === 'sea') return opts('Old-Search-Result')
            return values?.country === 'us' ? opts('New-York') : opts('Saint-Petersburg')
        })
        const { ref, container } = renderForm(
            <Form.Fields>
                <SelectInput name="country" label="Country">
                    <SelectInput.Option value="ru">Russia</SelectInput.Option>
                    <SelectInput.Option value="us">USA</SelectInput.Option>
                </SelectInput>
                <AjaxSelectInput
                    name="city"
                    label="City"
                    resetOnChangeOf={['country']}
                    fetchOptions={fetchCity}
                />
            </Form.Fields>,
        )

        act(() => {
            ref.current?.setValues({ country: 'ru', city: 'spb' })
        })

        // Operator types into the city search → schedules a debounced fetch.
        const cityCombobox = comboboxes(container)[1]
        act(() => {
            fireEvent.change(cityCombobox, { target: { value: 'sea' } })
        })

        // Before the 500ms debounce elapses, the operator changes the country.
        // The handler cancels the pending search and eager-refetches.
        await selectOption(container, 0, 1)

        // Advance past the debounce: the cancelled search must NOT fire.
        await act(async () => {
            vi.advanceTimersByTime(600)
            await Promise.resolve()
        })

        // The search ('sea') was cancelled; only the cascade refetch ran.
        expect(fetchCity.mock.calls.every((c) => c[1] !== 'sea')).toBe(true)
        expect(fetchCity).toHaveBeenCalledTimes(1)
        expect((fetchCity.mock.calls[0][2] as Record<string, unknown>).country).toBe('us')
    })
})

describe('Reject: a failed refetch leaves options empty, not the old parent’s', () => {
    test('refetch rejects → options empty, console.error called', async () => {
        const error = vi.spyOn(console, 'error').mockImplementation(() => {})
        // The first parent change populates city options; the second rejects. A
        // single rendered AjaxSelect is used (see BusDriver) so the dropdown we
        // open at the end unambiguously belongs to the city field.
        let shouldReject = false
        const fetchCity = fetchMock(async () => {
            if (shouldReject) throw new Error('boom')
            return opts('Old-City-A', 'Old-City-B')
        })
        let drive!: (path: string, value: unknown) => void
        const { ref, container } = renderForm(
            <Form.Fields>
                <AjaxSelectInput
                    name="city"
                    label="City"
                    resetOnChangeOf={['country']}
                    fetchOptions={fetchCity}
                />
                <BusDriver onReady={(fn) => (drive = fn)} />
            </Form.Fields>,
        )

        await setValues(ref, { country: 'ru', city: 'spb' })

        // First change populates city options, so there ARE old options that a
        // later failed refetch must NOT leave selectable.
        await act(async () => {
            drive('country', 'us')
        })
        await flush()
        expect(fetchCity).toHaveBeenCalledTimes(1)

        // Second change: the refetch now rejects. The handler clears options
        // synchronously (setOptions([])) and the catch never replaces them.
        shouldReject = true
        await act(async () => {
            drive('country', 'ru')
        })
        await flush()

        expect(fetchCity).toHaveBeenCalledTimes(2)
        expect(error).toHaveBeenCalled()

        // Open the city dropdown: no options of the old country remain.
        await act(async () => {
            fireEvent.mouseDown(comboboxes(container)[0])
        })
        expect(document.querySelectorAll('.select-item-option').length).toBe(0)
    })
})

describe('Identical value: re-selecting the same country does not reset', () => {
    test('the HOC suppresses an identical-value notify → no cascade fires', async () => {
        const fetchCity = fetchMock(async () => opts('Moscow'))
        const { ref, container } = renderForm(
            <Form.Fields>
                <SelectInput name="country" label="Country">
                    <SelectInput.Option value="ru">Russia</SelectInput.Option>
                    <SelectInput.Option value="us">USA</SelectInput.Option>
                </SelectInput>
                <AjaxSelectInput
                    name="city"
                    label="City"
                    resetOnChangeOf={['country']}
                    fetchOptions={fetchCity}
                />
            </Form.Fields>,
        )

        await setValues(ref, { country: 'ru', city: 'spb' })

        // Re-select Russia (index 0) — the current value. The HOC's onChange
        // wrapper sees an identical value and does not notify, so no reset.
        await selectOption(container, 0, 0)
        await flush()

        expect(ref.current?.values.city).toBe('spb')
        expect(fetchCity).not.toHaveBeenCalled()
    })
})

describe('Backward compat: a two-argument fetchOptions works (type + runtime)', () => {
    test('a callback ignoring the 3rd arg still resolves options on cascade', async () => {
        // A two-argument callback (the legacy shape). Assigning it to a 2-arg type
        // first proves it is still accepted by the 3-arg-accepting `fetchOptions`
        // prop at the type level; the mock is asserted on below at runtime.
        const legacyFetch = vi.fn(async (_field: string, _query?: string) =>
            opts('Moscow', 'Kazan'),
        )
        const _typecheck: (field: string, query?: string) => Promise<OptionType[]> = legacyFetch
        void _typecheck
        const { ref, container } = renderForm(
            <Form.Fields>
                <SelectInput name="country" label="Country">
                    <SelectInput.Option value="ru">Russia</SelectInput.Option>
                    <SelectInput.Option value="us">USA</SelectInput.Option>
                </SelectInput>
                <AjaxSelectInput
                    name="city"
                    label="City"
                    resetOnChangeOf={['country']}
                    fetchOptions={legacyFetch}
                />
            </Form.Fields>,
        )

        await setValues(ref, { country: 'ru', city: 'spb' })
        await selectOption(container, 0, 1)
        await flush()

        expect(ref.current?.values.city).toBeNull()
        expect(legacyFetch).toHaveBeenCalledTimes(1)
        // It received a 3rd arg at runtime (the scope values) but ignored it.
        expect(legacyFetch.mock.calls[0].length).toBe(3)
    })
})

describe('value={null} renders the placeholder cleanly (no normalization needed)', () => {
    test('a reset to null shows no chosen option', async () => {
        const fetchCity = fetchMock(async () => opts('Moscow'))
        const { ref, container } = renderForm(
            <Form.Fields>
                <SelectInput name="country" label="Country">
                    <SelectInput.Option value="ru">Russia</SelectInput.Option>
                    <SelectInput.Option value="us">USA</SelectInput.Option>
                </SelectInput>
                <AjaxSelectInput
                    name="city"
                    label="City"
                    placeholder="Pick a city"
                    resetOnChangeOf={['country']}
                    fetchOptions={fetchCity}
                />
            </Form.Fields>,
        )

        await setValues(ref, { country: 'ru', city: 'spb' })
        await selectOption(container, 0, 1)
        await flush()

        expect(ref.current?.values.city).toBeNull()
        // No selection item is rendered for the city select (null → placeholder).
        const citySelect = container.querySelectorAll('.select')[1]
        expect(citySelect.querySelector('.select-selection-item')).toBeNull()
    })
})

describe('StrictMode: subscription survives double-mount; cascade still resets once', () => {
    test('changing country resets city once under StrictMode', async () => {
        const fetchCity = fetchMock(async () => opts('Moscow'))
        const { ref, container } = renderForm(
            <Form.Fields>
                <SelectInput name="country" label="Country">
                    <SelectInput.Option value="ru">Russia</SelectInput.Option>
                    <SelectInput.Option value="us">USA</SelectInput.Option>
                </SelectInput>
                <AjaxSelectInput
                    name="city"
                    label="City"
                    resetOnChangeOf={['country']}
                    fetchOptions={fetchCity}
                />
            </Form.Fields>,
            undefined,
            { strict: true },
        )

        await setValues(ref, { country: 'ru', city: 'spb' })
        await selectOption(container, 0, 1)
        await flush()

        expect(ref.current?.values.city).toBeNull()
        // Effect cleanup unsubscribes the first mount's handler, so the reset
        // refetch runs exactly once even though StrictMode mounts twice.
        expect(fetchCity).toHaveBeenCalledTimes(1)
    })
})
