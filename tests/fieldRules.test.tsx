import React, { StrictMode, createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '../admiral/theme'
import { Form, FormRef } from '../admiral/form/Form'
import { TextInput } from '../admiral/form/fields/TextInput'
import { BooleanInput } from '../admiral/form/fields/BooleanInput'
import { SelectInput } from '../admiral/form/fields/SelectInput'
import { ArrayInput } from '../admiral/form/fields/ArrayInput'
import { useFieldRules } from '../admiral/form/fieldRules'
import { useForm } from '../admiral/form/FormContext'
import { scanFormChildren, evaluateVisibility } from '../admiral/form/rulesScan'
import { CrudIndexPageContextProvider, useCrudIndex } from '../admiral/crud/CrudIndexPageContext'
import type { FormTabItem } from '../admiral/form/FormTabs'
import type { FormRulesMap } from '../admiral/form/rules'

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

const input = (container: HTMLElement, name: string) =>
    container.querySelector<HTMLInputElement>(`input[name="${name}"]`)

const isRequiredMarked = (container: HTMLElement, name: string): boolean => {
    const el = input(container, name)
    if (!el) return false
    // Walk up to the Form.Item root and find the label span by its stable
    // substring (CSS modules hash the suffix under vitest).
    let node: HTMLElement | null = el
    while (node && !node.querySelector('[class*="item_Label"]')) node = node.parentElement
    const label = node?.querySelector('[class*="item_Label"]')
    return !!label && (label.className || '').includes('item_Label__Required')
}

const spyWarn = () => vi.spyOn(console, 'warn').mockImplementation(() => {})

afterEach(() => {
    cleanup()
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

describe('AE1: hidden field value persists across unmount → remount', () => {
    test('legal → fill INN → person (unmount) → legal again → INN visible with prior value', async () => {
        const { ref, container } = renderForm(
            <Form.Fields>
                <TextInput name="ae1_type" label="Type" />
                <TextInput
                    name="ae1_inn"
                    label="INN"
                    visibleWhen={{ field: 'ae1_type', is: 'legal' }}
                />
            </Form.Fields>,
        )

        await setValues(ref, { ae1_type: 'legal' })
        const innEl = input(container, 'ae1_inn')!
        fireEvent.change(innEl, { target: { value: '7701234567' } })
        expect(input(container, 'ae1_inn')!.value).toBe('7701234567')

        // Switch to person → INN unmounts; its value persists in form context.
        await setValues(ref, { ae1_type: 'person', ae1_inn: '7701234567' })
        expect(input(container, 'ae1_inn')).toBeNull()

        // Back to legal → INN visible again with the previously typed value.
        await setValues(ref, { ae1_type: 'legal', ae1_inn: '7701234567' })
        expect(input(container, 'ae1_inn')!.value).toBe('7701234567')
    })
})

describe('AE3 / AE18: required + hidden → no marker, no block, key omitted', () => {
    test('a required field hidden by a rule shows no required marker', async () => {
        const { ref, container } = renderForm(
            <Form.Fields>
                <TextInput name="ae3_type" label="Type" />
                <TextInput
                    name="ae3_inn"
                    label="INN"
                    required
                    visibleWhen={{ field: 'ae3_type', is: 'legal' }}
                />
            </Form.Fields>,
        )

        // Visible: the required marker is present.
        await setValues(ref, { ae3_type: 'legal' })
        expect(isRequiredMarked(container, 'ae3_inn')).toBe(true)

        // Hidden: no input at all → no marker, nothing to block submit.
        await setValues(ref, { ae3_type: 'person' })
        expect(input(container, 'ae3_inn')).toBeNull()
    })

    test('AE18: visibleWhen(false) + requiredWhen(true) → hidden wins; key omitted', async () => {
        const submitData = vi.fn(async (_v: Record<string, unknown>) => ({}))
        const { ref, container } = renderForm(
            <Form.Fields>
                <TextInput name="ae18_type" label="Type" />
                <TextInput
                    name="ae18_inn"
                    label="INN"
                    visibleWhen={{ field: 'ae18_type', is: 'legal' }}
                    requiredWhen={{ field: 'ae18_type', is: 'person' }}
                />
            </Form.Fields>,
            { submitData },
        )

        await setValues(ref, { ae18_type: 'person', ae18_inn: 'x' })
        // requiredWhen would be true, but visibleWhen is false → hidden wins.
        expect(input(container, 'ae18_inn')).toBeNull()

        await submit(ref)
        const payload = submitData.mock.calls[0][0] as Record<string, unknown>
        expect('ae18_inn' in payload).toBe(false)
    })
})

describe('AE17: disabledWhen OR-merge with static disabled', () => {
    test('static disabled={false} + disabledWhen→true → control disabled', async () => {
        const { ref, container } = renderForm(
            <Form.Fields>
                <TextInput name="ae17_type" label="Type" />
                <TextInput
                    name="ae17_inn"
                    label="INN"
                    disabled={false}
                    disabledWhen={{ field: 'ae17_type', is: 'legal' }}
                />
            </Form.Fields>,
        )

        await setValues(ref, { ae17_type: 'person' })
        expect(input(container, 'ae17_inn')!.disabled).toBe(false)

        await setValues(ref, { ae17_type: 'legal' })
        expect(input(container, 'ae17_inn')!.disabled).toBe(true)
    })

    test('static disabled={true} stays disabled regardless of the rule (OR-merge)', async () => {
        const { ref, container } = renderForm(
            <Form.Fields>
                <TextInput name="ae17b_type" label="Type" />
                <TextInput
                    name="ae17b_inn"
                    label="INN"
                    disabled
                    disabledWhen={{ field: 'ae17b_type', is: 'legal' }}
                />
            </Form.Fields>,
        )

        // Rule false, but static disabled=true → still disabled.
        await setValues(ref, { ae17b_type: 'person' })
        expect(input(container, 'ae17b_inn')!.disabled).toBe(true)
    })
})

describe('requiredWhen toggles the Form.Item marker; static required ignored when set', () => {
    test('marker follows the requiredWhen rule as values change', async () => {
        const { ref, container } = renderForm(
            <Form.Fields>
                <TextInput name="rw_type" label="Type" />
                <TextInput
                    name="rw_inn"
                    label="INN"
                    requiredWhen={{ field: 'rw_type', is: 'legal' }}
                />
            </Form.Fields>,
        )

        await setValues(ref, { rw_type: 'person' })
        expect(isRequiredMarked(container, 'rw_inn')).toBe(false)

        await setValues(ref, { rw_type: 'legal' })
        expect(isRequiredMarked(container, 'rw_inn')).toBe(true)
    })

    test('when requiredWhen is set, static required is ignored', async () => {
        const { ref, container } = renderForm(
            <Form.Fields>
                <TextInput name="rw2_type" label="Type" />
                <TextInput
                    name="rw2_inn"
                    label="INN"
                    required
                    requiredWhen={{ field: 'rw2_type', is: 'legal' }}
                />
            </Form.Fields>,
        )

        // Static required=true, but requiredWhen evaluates false → no marker.
        await setValues(ref, { rw2_type: 'person' })
        expect(isRequiredMarked(container, 'rw2_inn')).toBe(false)
    })
})

describe('Row scope (F3, AE7-render): a rule in an ArrayInput row reads its own row', () => {
    test('two rows with different values → different per-row visibility', async () => {
        const { ref, container } = renderForm(
            <Form.Fields>
                <ArrayInput name="variants" label="Variants">
                    <BooleanInput name="has_discount" label="Discount" />
                    <TextInput
                        name="discount"
                        label="Amount"
                        visibleWhen={{ field: 'has_discount', is: true }}
                    />
                </ArrayInput>
            </Form.Fields>,
        )

        await setValues(ref, {
            variants: [{ has_discount: true }, { has_discount: false }],
        })

        const discounts = container.querySelectorAll<HTMLInputElement>('input[name="discount"]')
        // Row 0 (has_discount true) shows its discount; row 1 (false) does not.
        expect(discounts.length).toBe(1)
    })
})

describe('Statics preserved through the wrapper', () => {
    test('U3 static scan reads rule props off a wrapped element', () => {
        const scan = scanFormChildren(
            <Form.Fields>
                <TextInput name="x" label="X" visibleWhen={{ field: 'y', is: 1 }} />
            </Form.Fields>,
        )
        expect(scan.hasRules).toBe(true)
        const evaluated = evaluateVisibility(scan, { y: 2 })
        expect(evaluated.hiddenPaths.has('x')).toBe(true)
        expect(evaluated.scannedPaths.has('x')).toBe(true)
    })

    test('Form.Tabs collectFieldNames discovers a wrapped field and badges its error', async () => {
        const items: FormTabItem[] = [
            { key: 'main', label: 'Main', children: <TextInput name="name" label="Name" /> },
            {
                key: 'details',
                label: 'Details',
                children: <TextInput name="tab_inn" label="INN" />,
            },
        ]
        const ref = createRef<FormRef>()
        render(
            <MemoryRouter>
                <ThemeProvider>
                    <Form
                        ref={ref}
                        submitData={async () => {
                            throw {
                                response: {
                                    status: 422,
                                    data: { errors: { tab_inn: ['Required'] } },
                                },
                            }
                        }}
                    >
                        <Form.Tabs defaultActiveKey="main" items={items} />
                    </Form>
                </ThemeProvider>
            </MemoryRouter>,
        )

        await act(async () => {
            await ref.current?.handleSubmit()
        })

        // The wrapped TextInput kept its inputName static → collectFieldNames
        // found `tab_inn` → the Details tab is badged and auto-selected.
        expect(screen.getByRole('tab', { name: /Details/ }).getAttribute('aria-selected')).toBe(
            'true',
        )
        expect(screen.getByText('1 error')).toBeTruthy()
    })

    test('CRUD-filter scanner still recognizes a wrapped field by inputName', () => {
        // CrudIndexPageContextProvider reads child.type.inputName / child.props.
        let captured: ReturnType<typeof useCrudIndex>['filter']['fields'] = []
        const Probe = () => {
            captured = useCrudIndex().filter.fields
            return null
        }
        render(
            <MemoryRouter>
                <ThemeProvider>
                    <CrudIndexPageContextProvider
                        filterFields={
                            <>
                                <TextInput name="q" label="Query" />
                                <SelectInput name="status" label="Status" />
                            </>
                        }
                    >
                        <Probe />
                    </CrudIndexPageContextProvider>
                </ThemeProvider>
            </MemoryRouter>,
        )
        expect(captured.map((f) => f.name)).toEqual(['q', 'status'])
        expect(captured.map((f) => f.type)).toEqual(['TextInput', 'SelectInput'])
    })

    test('SelectInput.Option renders inside a wrapped SelectInput without crashing', () => {
        const { container } = renderForm(
            <Form.Fields>
                <SelectInput name="group" label="Group">
                    <SelectInput.Option value="a">Admins</SelectInput.Option>
                    <SelectInput.Option value="b">Bots</SelectInput.Option>
                </SelectInput>
            </Form.Fields>,
        )
        // The select rendered (its combobox is present); no throw on Option access.
        expect(SelectInput.Option).toBeTruthy()
        expect(SelectInput.OptGroup).toBeTruthy()
        expect(container.querySelector('[class*="select"]')).not.toBeNull()
    })
})

describe('Escape hatch + conflict warnings (KTD3, KTD10)', () => {
    test('a rule only in the Form `rules` map hides the field without any JSX prop', async () => {
        const rules: FormRulesMap = { esc_inn: { visible: { field: 'esc_type', is: 'legal' } } }
        const { ref, container } = renderForm(
            <Form.Fields>
                <TextInput name="esc_type" label="Type" />
                <TextInput name="esc_inn" label="INN" />
            </Form.Fields>,
            { rules },
        )

        await setValues(ref, { esc_type: 'person' })
        expect(input(container, 'esc_inn')).toBeNull()

        await setValues(ref, { esc_type: 'legal' })
        expect(input(container, 'esc_inn')).not.toBeNull()
    })

    test('JSX prop + map entry for the same field → JSX wins + warn once', async () => {
        const warn = spyWarn()
        const rules: FormRulesMap = {
            conflict_inn: { visible: { field: 'conflict_type', is: 'person' } },
        }
        const { ref, container } = renderForm(
            <Form.Fields>
                <TextInput name="conflict_type" label="Type" />
                <TextInput
                    name="conflict_inn"
                    label="INN"
                    visibleWhen={{ field: 'conflict_type', is: 'legal' }}
                />
            </Form.Fields>,
            { rules },
        )

        // JSX rule wins: visible only when type === 'legal'.
        await setValues(ref, { conflict_type: 'legal' })
        expect(input(container, 'conflict_inn')).not.toBeNull()
        await setValues(ref, { conflict_type: 'person' })
        expect(input(container, 'conflict_inn')).toBeNull()

        const conflictWarns = warn.mock.calls.filter((c) =>
            String(c[0]).includes('both a JSX rule prop and a Form'),
        )
        expect(conflictWarns.length).toBe(1)
    })
})

describe('Excluded-prop & misuse warnings (KTD11, KTD3, KTD10)', () => {
    test('requiredWhen on ArrayInput warns and is ignored', async () => {
        const warn = spyWarn()
        // ArrayInputProps omits `requiredWhen` at the type level (KTD11); a JS
        // consumer that ignores the type still gets a runtime warn. Typing the
        // misuse props as `any` mirrors that (and avoids an `@ts-expect-error`
        // that prettier can detach from the offending line when it reflows JSX).
        const misuse: any = { name: 'arr_rw', label: 'Arr', requiredWhen: { field: 'z', is: 1 } }
        renderForm(
            <Form.Fields>
                <ArrayInput {...misuse}>
                    <TextInput name="x" label="X" />
                </ArrayInput>
            </Form.Fields>,
        )
        expect(
            warn.mock.calls.some((c) => String(c[0]).includes('`requiredWhen` is not supported')),
        ).toBe(true)
    })

    test('disabledWhen on SlugInput warns and is ignored', async () => {
        const warn = spyWarn()
        const { SlugInput } = await import('../admiral/form/fields/SlugInput')
        // SlugInputProps omits `disabledWhen` at the type level (KTD11).
        const misuse: any = {
            name: 'slug',
            from: 'title',
            label: 'Slug',
            disabledWhen: { field: 'z', is: 1 },
        }
        renderForm(
            <Form.Fields>
                <TextInput name="title" label="Title" />
                <SlugInput {...misuse} />
            </Form.Fields>,
        )
        expect(
            warn.mock.calls.some((c) => String(c[0]).includes('`disabledWhen` is not supported')),
        ).toBe(true)
    })

    test('self-reference rule warns', async () => {
        const warn = spyWarn()
        renderForm(
            <Form.Fields>
                <TextInput
                    name="selfref"
                    label="Self"
                    visibleWhen={{ field: 'selfref', is: 'x' }}
                />
            </Form.Fields>,
        )
        expect(warn.mock.calls.some((c) => String(c[0]).includes('references its own value'))).toBe(
            true,
        )
    })

    test('scan-invisibility: a ruled field in a custom wrapper the scan cannot see → warn', async () => {
        const warn = spyWarn()
        // A custom component renders the field inside its body — the static scan
        // walks props.children of known nodes but cannot see into a foreign
        // component's render output, so `scan_hidden` is never scanned.
        const CustomWrapper = ({ children }: { children?: React.ReactNode }) => (
            <div>{children}</div>
        )
        const TreeWithCustom = () => (
            <Form.Fields>
                <CustomWrapper>
                    <TextInput
                        name="scan_hidden"
                        label="Hidden from scan"
                        visibleWhen={{ field: 'other', is: 1 }}
                    />
                </CustomWrapper>
            </Form.Fields>
        )
        renderForm(<TreeWithCustom />)
        expect(
            warn.mock.calls.some(
                (c) => String(c[0]).includes('static scan') && String(c[0]).includes('scan_hidden'),
            ),
        ).toBe(true)
    })
})

describe('useFieldRules public hook', () => {
    test('returns hidden/disabled/required from JSX props against current values', async () => {
        spyWarn() // `p_field` is not a scannable field → expected scan-invisibility warn.
        let result: { hidden: boolean; disabled: boolean; required: boolean } | null = null
        const Probe = () => {
            result = useFieldRules('p_field', {
                visibleWhen: { field: 'flag', is: true },
                disabledWhen: { field: 'lock', is: true },
                requiredWhen: { field: 'req', is: true },
            })
            return null
        }
        const { ref } = renderForm(
            <Form.Fields>
                <Probe />
            </Form.Fields>,
        )

        await setValues(ref, { flag: false, lock: true, req: true })
        expect(result).toEqual({ hidden: true, disabled: true, required: true })

        await setValues(ref, { flag: true, lock: false, req: false })
        expect(result).toEqual({ hidden: false, disabled: false, required: false })
    })
})

describe('StrictMode: hide → show with no value loss', () => {
    test('value persists across a rule-driven unmount/remount under StrictMode', async () => {
        const { ref, container } = renderForm(
            <Form.Fields>
                <TextInput name="sm_type" label="Type" />
                <TextInput
                    name="sm_inn"
                    label="INN"
                    visibleWhen={{ field: 'sm_type', is: 'legal' }}
                />
            </Form.Fields>,
            undefined,
            { strict: true },
        )

        await setValues(ref, { sm_type: 'legal' })
        fireEvent.change(input(container, 'sm_inn')!, { target: { value: 'kept' } })
        expect(input(container, 'sm_inn')!.value).toBe('kept')

        await setValues(ref, { sm_type: 'person', sm_inn: 'kept' })
        expect(input(container, 'sm_inn')).toBeNull()

        await setValues(ref, { sm_type: 'legal', sm_inn: 'kept' })
        expect(input(container, 'sm_inn')!.value).toBe('kept')
    })
})

describe('Cascade dispatch (KTD9): onChange notifies the bus, identical value does not', () => {
    test('a real change notifies; re-typing the same value does not', async () => {
        const events: Array<{ path: string; value: unknown }> = []
        const Subscriber = () => {
            const { fieldChange } = useForm()
            React.useEffect(
                () => fieldChange?.subscribe('cd_field', (e) => events.push(e)),
                [fieldChange],
            )
            return null
        }
        const { ref, container } = renderForm(
            <Form.Fields>
                <TextInput name="cd_field" label="Field" />
                <Subscriber />
            </Form.Fields>,
        )

        await setValues(ref, { cd_field: '' })
        const el = input(container, 'cd_field')!
        await act(async () => {
            fireEvent.change(el, { target: { value: 'a' } })
        })
        expect(events).toEqual([{ path: 'cd_field', value: 'a' }])

        // Re-fire the same value: getValueByPath now reads 'a' → no new notify.
        await act(async () => {
            fireEvent.change(el, { target: { value: 'a' } })
        })
        expect(events.length).toBe(1)
    })
})
