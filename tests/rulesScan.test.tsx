import React from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { scanFormChildren, evaluateVisibility, omitHiddenValues } from '../admiral/form/rulesScan'
import type { FormRulesMap, RuleInput } from '../admiral/form/rules'
import { Form } from '../admiral/form/Form'
import { TextInput as TextInputBase, type TextInputProps } from '../admiral/form/fields/TextInput'
import {
    BooleanInput as BooleanInputBase,
    type BooleanInputProps,
} from '../admiral/form/fields/BooleanInput'
import { SelectInput } from '../admiral/form/fields/SelectInput'
import {
    ArrayInput as ArrayInputBase,
    type ArrayInputProps,
} from '../admiral/form/fields/ArrayInput'
import { TranslatableInput as TranslatableInputBase } from '../admiral/form/fields/TranslatableInput'
import type { FormTabItem } from '../admiral/form/FormTabs'

afterEach(() => {
    vi.restoreAllMocks()
})

const spyWarn = () => vi.spyOn(console, 'warn').mockImplementation(() => {})

/**
 * Rule props (`visibleWhen` / `disabledWhen` / `requiredWhen` / `keepInPayload`)
 * become first-class props on every field type in U5; until then the scan reads
 * them off `child.props` purely as data. To keep these structural tests writing
 * real admiral inputs the same way U5 consumers will — props inline in JSX —
 * each field is re-typed once here to accept the rule props. The cast is by
 * reference, so the runtime component (and the `inputName` static the scan reads
 * off it) is unchanged; no field file is touched.
 */
type RuleProps = {
    visibleWhen?: RuleInput
    disabledWhen?: RuleInput
    requiredWhen?: RuleInput
    keepInPayload?: boolean
}

const TextInput = TextInputBase as React.FC<TextInputProps & RuleProps>
const BooleanInput = BooleanInputBase as React.FC<BooleanInputProps & RuleProps>
const ArrayInput = ArrayInputBase as React.FC<ArrayInputProps & RuleProps>
const TranslatableInput = TranslatableInputBase as unknown as React.FC<
    Record<string, unknown> & RuleProps
>

// Convenience: scan + evaluate in one step.
const visibility = (
    children: React.ReactNode,
    values: Record<string, unknown>,
    rulesMap?: FormRulesMap,
) => evaluateVisibility(scanFormChildren(children, rulesMap), values)

describe('scanFormChildren is a pure structural pass (no values)', () => {
    test('returns the same scan shape regardless of values', () => {
        const tree = (
            <Form.Fields>
                <TextInput name="type" label="Type" />
                <TextInput name="inn" label="INN" visibleWhen={{ field: 'type', is: 'legal' }} />
            </Form.Fields>
        )
        const scan = scanFormChildren(tree)
        expect(scan.hasRules).toBe(true)
        expect(scan.nodes).toHaveLength(2)
        expect(scan.nodes[0]).toMatchObject({ kind: 'field', name: 'type' })
        expect(scan.nodes[1]).toMatchObject({ kind: 'field', name: 'inn' })
    })
})

describe('root fields: visibleWhen DSL and function', () => {
    test('DSL rule — hidden field is in hiddenPaths, visible field is not', () => {
        const tree = (
            <Form.Fields>
                <TextInput name="type" label="Type" />
                <TextInput name="inn" label="INN" visibleWhen={{ field: 'type', is: 'legal' }} />
            </Form.Fields>
        )

        const hiddenForPerson = visibility(tree, { type: 'person' }).hiddenPaths
        expect(hiddenForPerson.has('inn')).toBe(true)
        expect(hiddenForPerson.has('type')).toBe(false)

        const hiddenForLegal = visibility(tree, { type: 'legal' }).hiddenPaths
        expect(hiddenForLegal.has('inn')).toBe(false)
    })

    test('function rule behaves the same', () => {
        const rule: RuleInput = (values) => values.type === 'legal'
        const tree = (
            <Form.Fields>
                <TextInput name="passport" label="Passport" visibleWhen={rule} />
            </Form.Fields>
        )

        expect(visibility(tree, { type: 'person' }).hiddenPaths.has('passport')).toBe(true)
        expect(visibility(tree, { type: 'legal' }).hiddenPaths.has('passport')).toBe(false)
    })

    test('scannedPaths contains every discovered field, ruled or not', () => {
        const tree = (
            <Form.Fields>
                <TextInput name="type" label="Type" />
                <TextInput name="inn" label="INN" visibleWhen={{ field: 'type', is: 'legal' }} />
            </Form.Fields>
        )
        const { scannedPaths } = visibility(tree, {})
        expect(scannedPaths).toEqual(new Set(['type', 'inn']))
    })
})

describe('deny-list omit (AE11, R16)', () => {
    test('unknown keys pass through untouched and keep reference identity', () => {
        const tree = (
            <Form.Fields>
                <TextInput name="type" label="Type" />
                <TextInput name="inn" label="INN" visibleWhen={{ field: 'type', is: 'legal' }} />
            </Form.Fields>
        )
        const createdAt = { at: '2026-06-13', tz: 'UTC' }
        const values = { id: 42, created_at: createdAt, type: 'person', inn: '7701234567' }

        const { hiddenPaths } = visibility(tree, values)
        expect(hiddenPaths).toEqual(new Set(['inn']))

        const payload = omitHiddenValues(values, hiddenPaths, new Set())
        // id and created_at were never scanned → present.
        expect(payload.id).toBe(42)
        expect(payload.created_at).toBe(createdAt) // same reference (untouched branch)
        // the hidden field is gone, but its value still lived in `values`.
        expect('inn' in payload).toBe(false)
        expect(values.inn).toBe('7701234567')
    })
})

describe('Form.Tabs (AE12)', () => {
    test('a ruled field inside items[1].children is discovered and omitted', () => {
        const items: FormTabItem[] = [
            { key: 'main', label: 'Main', children: <TextInput name="name" label="Name" /> },
            {
                key: 'legal',
                label: 'Legal',
                children: (
                    <TextInput
                        name="inn"
                        label="INN"
                        visibleWhen={{ field: 'type', is: 'legal' }}
                    />
                ),
            },
        ]
        const tree = <Form.Tabs items={items} />

        const { scannedPaths, hiddenPaths } = visibility(tree, {
            type: 'person',
            inn: 'x',
            name: 'A',
        })
        // traversed items[].children, not props.children
        expect(scannedPaths).toEqual(new Set(['name', 'inn']))
        expect(hiddenPaths.has('inn')).toBe(true)

        const payload = omitHiddenValues(
            { type: 'person', inn: 'x', name: 'A' },
            hiddenPaths,
            new Set(),
        )
        expect('inn' in payload).toBe(false)
        expect(payload.name).toBe('A')
    })
})

describe('Form.When', () => {
    test('false When — enclosed names are collected and omitted', () => {
        const tree = (
            <Form.Fields>
                <SelectInput name="type" label="Type" />
                <Form.When rule={{ field: 'type', is: 'legal' }}>
                    <TextInput name="inn" label="INN" />
                    <TextInput name="kpp" label="KPP" />
                </Form.When>
            </Form.Fields>
        )

        const { scannedPaths, hiddenPaths } = visibility(tree, { type: 'person' })
        // both branches are walked structurally (names needed for omit)
        expect(scannedPaths).toEqual(new Set(['type', 'inn', 'kpp']))
        expect(hiddenPaths).toEqual(new Set(['inn', 'kpp']))

        // When true → neither hidden
        expect(visibility(tree, { type: 'legal' }).hiddenPaths.size).toBe(0)
    })

    test('nested When combine as AND (inner hidden unless both true)', () => {
        const tree = (
            <Form.Fields>
                <Form.When rule={{ field: 'a', is: true }}>
                    <Form.When rule={{ field: 'b', is: true }}>
                        <TextInput name="inner" label="Inner" />
                    </Form.When>
                </Form.When>
            </Form.Fields>
        )

        expect(visibility(tree, { a: true, b: false }).hiddenPaths.has('inner')).toBe(true)
        expect(visibility(tree, { a: false, b: true }).hiddenPaths.has('inner')).toBe(true)
        expect(visibility(tree, { a: true, b: true }).hiddenPaths.has('inner')).toBe(false)
    })

    test('a field rule still applies under a visible When', () => {
        const tree = (
            <Form.Fields>
                <Form.When rule={{ field: 'a', is: true }}>
                    <TextInput name="x" label="X" visibleWhen={{ field: 'b', is: true }} />
                </Form.When>
            </Form.Fields>
        )
        // When true but field's own rule false → hidden (AND across layers)
        expect(visibility(tree, { a: true, b: false }).hiddenPaths.has('x')).toBe(true)
        expect(visibility(tree, { a: true, b: true }).hiddenPaths.has('x')).toBe(false)
    })
})

describe('ArrayInput (AE7)', () => {
    test('children-nodes template: rule true only in the second row', () => {
        const tree = (
            <Form.Fields>
                <ArrayInput name="variants" label="Variants">
                    <BooleanInput name="has_discount" label="Discount" />
                    <TextInput
                        name="discount"
                        label="Discount size"
                        visibleWhen={{ field: 'has_discount', is: true }}
                    />
                </ArrayInput>
            </Form.Fields>
        )
        const values = {
            variants: [{ has_discount: false }, { has_discount: true, discount: '10' }],
        }

        const { scannedPaths, hiddenPaths } = visibility(tree, values)
        // row paths are prefixed with name.idx.
        expect(scannedPaths.has('variants')).toBe(true)
        expect(scannedPaths.has('variants.0.has_discount')).toBe(true)
        expect(scannedPaths.has('variants.0.discount')).toBe(true)
        expect(scannedPaths.has('variants.1.discount')).toBe(true)

        // row 0 has_discount:false → discount hidden; row 1 true → kept
        expect(hiddenPaths.has('variants.0.discount')).toBe(true)
        expect(hiddenPaths.has('variants.1.discount')).toBe(false)

        const payload = omitHiddenValues(values, hiddenPaths, new Set()) as typeof values
        expect('discount' in payload.variants[0]).toBe(false)
        expect(payload.variants[1].discount).toBe('10')
    })

    test('children-function template is resolved per row', () => {
        const tree = (
            <Form.Fields>
                <ArrayInput name="variants" label="Variants">
                    {(_row, _idx) => (
                        <>
                            <BooleanInput name="has_discount" label="Discount" />
                            <TextInput
                                name="discount"
                                label="Discount size"
                                visibleWhen={{ field: 'has_discount', is: true }}
                            />
                        </>
                    )}
                </ArrayInput>
            </Form.Fields>
        )
        const values = {
            variants: [{ has_discount: true, discount: '5' }, { has_discount: false }],
        }

        const { hiddenPaths } = visibility(tree, values)
        expect(hiddenPaths.has('variants.0.discount')).toBe(false)
        expect(hiddenPaths.has('variants.1.discount')).toBe(true)
    })

    test('phantom row: values[name] === undefined → no crash, no omit', () => {
        const tree = (
            <Form.Fields>
                <ArrayInput name="variants" label="Variants">
                    <TextInput
                        name="discount"
                        label="Discount size"
                        visibleWhen={{ field: 'has_discount', is: true }}
                    />
                </ArrayInput>
            </Form.Fields>
        )
        const { scannedPaths, hiddenPaths } = visibility(tree, {})
        expect(scannedPaths).toEqual(new Set(['variants']))
        expect(hiddenPaths.size).toBe(0)
    })

    test('nested ArrayInput recurses with compound prefixes', () => {
        const tree = (
            <Form.Fields>
                <ArrayInput name="orders" label="Orders">
                    <ArrayInput name="lines" label="Lines">
                        <TextInput
                            name="note"
                            label="Note"
                            visibleWhen={{ field: 'flagged', is: true }}
                        />
                    </ArrayInput>
                </ArrayInput>
            </Form.Fields>
        )
        const values = {
            orders: [{ lines: [{ flagged: false }, { flagged: true, note: 'hi' }] }],
        }

        const { scannedPaths, hiddenPaths } = visibility(tree, values)
        expect(scannedPaths.has('orders.0.lines')).toBe(true)
        expect(scannedPaths.has('orders.0.lines.0.note')).toBe(true)
        expect(scannedPaths.has('orders.0.lines.1.note')).toBe(true)
        expect(hiddenPaths.has('orders.0.lines.0.note')).toBe(true)
        expect(hiddenPaths.has('orders.0.lines.1.note')).toBe(false)
    })

    test('a rule on the ArrayInput element hides the whole name', () => {
        const tree = (
            <Form.Fields>
                <ArrayInput
                    name="variants"
                    label="Variants"
                    visibleWhen={{ field: 'show', is: true }}
                >
                    <TextInput name="discount" label="Discount" />
                </ArrayInput>
            </Form.Fields>
        )
        const values = { show: false, variants: [{ discount: '1' }] }

        const { hiddenPaths } = visibility(tree, values)
        expect(hiddenPaths.has('variants')).toBe(true)
        // rows inside a hidden array are also hidden
        expect(hiddenPaths.has('variants.0.discount')).toBe(true)

        const payload = omitHiddenValues(values, hiddenPaths, new Set())
        expect('variants' in payload).toBe(false)
    })
})

describe('TranslatableInput', () => {
    test('visibleWhen on the input hides `name` wholesale; languages in scannedPaths', () => {
        const languages = [
            { label: 'EN', value: 'en' },
            { label: 'RU', value: 'ru' },
        ]
        const tree = (
            <Form.Fields>
                <TranslatableInput
                    field="text"
                    name="title"
                    label="Title"
                    languages={languages}
                    visibleWhen={{ field: 'translated', is: true }}
                />
            </Form.Fields>
        )
        const values = { translated: false, title: { en: 'Hi', ru: 'Привет' } }

        const { scannedPaths, hiddenPaths } = visibility(tree, values)
        // name itself + name.<lang> for each language
        expect(scannedPaths).toEqual(new Set(['title', 'title.en', 'title.ru']))
        expect(hiddenPaths.has('title')).toBe(true)

        const payload = omitHiddenValues(values, hiddenPaths, new Set())
        expect('title' in payload).toBe(false)
    })

    test('visible TranslatableInput is not hidden', () => {
        const languages = [{ label: 'EN', value: 'en' }]
        const tree = (
            <Form.Fields>
                <TranslatableInput
                    field="text"
                    name="title"
                    label="Title"
                    languages={languages}
                    visibleWhen={{ field: 'translated', is: true }}
                />
            </Form.Fields>
        )
        expect(visibility(tree, { translated: true }).hiddenPaths.has('title')).toBe(false)
    })
})

describe('keepInPayload (AE2-override)', () => {
    test('a hidden field with keepInPayload stays in the omit result', () => {
        const tree = (
            <Form.Fields>
                <TextInput
                    name="inn"
                    label="INN"
                    visibleWhen={{ field: 'type', is: 'legal' }}
                    keepInPayload
                />
            </Form.Fields>
        )
        const values = { type: 'person', inn: '7701234567' }

        const { hiddenPaths, keepPaths } = visibility(tree, values)
        expect(hiddenPaths.has('inn')).toBe(true)
        // evaluateVisibility surfaces the keep-set so the caller never re-walks the scan.
        expect(keepPaths.has('inn')).toBe(true)

        const payload = omitHiddenValues(values, hiddenPaths, keepPaths)
        expect(payload.inn).toBe('7701234567')
    })

    test('keepInPayload inside an array row is surfaced with the name.idx prefix', () => {
        const tree = (
            <Form.Fields>
                <ArrayInput name="variants" label="Variants">
                    <TextInput
                        name="discount"
                        label="Discount"
                        visibleWhen={{ field: 'has_discount', is: true }}
                        keepInPayload
                    />
                </ArrayInput>
            </Form.Fields>
        )
        const values = { variants: [{ has_discount: false, discount: '1' }] }

        const { hiddenPaths, keepPaths } = visibility(tree, values)
        // hidden by its own rule, but rescued by the prefixed keep path —
        // this is why evaluateVisibility owns the prefixing, not the caller.
        expect(hiddenPaths.has('variants.0.discount')).toBe(true)
        expect(keepPaths.has('variants.0.discount')).toBe(true)

        const payload = omitHiddenValues(values, hiddenPaths, keepPaths) as typeof values
        expect(payload.variants[0].discount).toBe('1')
    })
})

describe('rules-map', () => {
    test('a root key hides the value (escape hatch — field not in the tree)', () => {
        const rulesMap: FormRulesMap = {
            legacy_code: { visible: { field: 'type', is: 'legal' } },
        }
        const tree = (
            <Form.Fields>
                <TextInput name="type" label="Type" />
            </Form.Fields>
        )
        const values = { type: 'person', legacy_code: 'L-1' }

        const { hiddenPaths } = visibility(tree, values, rulesMap)
        // legacy_code is not a discovered field, but it exists in values → hidden.
        expect(hiddenPaths.has('legacy_code')).toBe(true)

        const payload = omitHiddenValues(values, hiddenPaths, new Set())
        expect('legacy_code' in payload).toBe(false)

        // When the rule is true, the escape-hatch path is not hidden.
        expect(
            visibility(tree, { type: 'legal', legacy_code: 'L-1' }, rulesMap).hiddenPaths.size,
        ).toBe(0)
    })

    test('rules-map applies to a discovered field with no JSX rule', () => {
        const rulesMap: FormRulesMap = { inn: { visible: { field: 'type', is: 'legal' } } }
        const tree = (
            <Form.Fields>
                <TextInput name="type" label="Type" />
                <TextInput name="inn" label="INN" />
            </Form.Fields>
        )
        expect(visibility(tree, { type: 'person' }, rulesMap).hiddenPaths.has('inn')).toBe(true)
        expect(visibility(tree, { type: 'legal' }, rulesMap).hiddenPaths.has('inn')).toBe(false)
    })

    test('JSX visibleWhen wins over rules-map for the same field (no AND)', () => {
        // JSX says visible-when-legal; map says visible-when-vip. JSX must win.
        const rulesMap: FormRulesMap = { inn: { visible: { field: 'vip', is: true } } }
        const tree = (
            <Form.Fields>
                <TextInput name="inn" label="INN" visibleWhen={{ field: 'type', is: 'legal' }} />
            </Form.Fields>
        )
        // type legal, vip false → JSX wins → visible
        expect(
            visibility(tree, { type: 'legal', vip: false }, rulesMap).hiddenPaths.has('inn'),
        ).toBe(false)
        // type person, vip true → JSX wins → hidden
        expect(
            visibility(tree, { type: 'person', vip: true }, rulesMap).hiddenPaths.has('inn'),
        ).toBe(true)
    })

    test('a key with no corresponding value path → exactly one warn', () => {
        const warn = spyWarn()
        const rulesMap: FormRulesMap = { ghost: { visible: { field: 'type', is: 'legal' } } }
        const tree = (
            <Form.Fields>
                <TextInput name="type" label="Type" />
            </Form.Fields>
        )
        visibility(tree, { type: 'person' }, rulesMap)

        expect(warn).toHaveBeenCalledTimes(1)
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('[Admiral]'))
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('ghost'))
    })

    test('hasRules is true for a non-empty rules-map even with no rule props', () => {
        const tree = (
            <Form.Fields>
                <TextInput name="type" label="Type" />
            </Form.Fields>
        )
        const scan = scanFormChildren(tree, { foo: { visible: { field: 'type', is: 'a' } } })
        expect(scan.hasRules).toBe(true)
    })

    test('hasRules is false for a tree with no rules at all', () => {
        const tree = (
            <Form.Fields>
                <TextInput name="a" label="A" />
                <TextInput name="b" label="B" />
                <ArrayInput name="rows" label="Rows">
                    <TextInput name="x" label="X" />
                </ArrayInput>
            </Form.Fields>
        )
        const { hasRules } = visibility(tree, {})
        expect(hasRules).toBe(false)
    })
})

describe('hasRules structural flag', () => {
    test('true when a field carries disabledWhen (counts toward hasRules, not hiddenPaths)', () => {
        const tree = (
            <Form.Fields>
                <TextInput name="x" label="X" disabledWhen={{ field: 'y', is: true }} />
            </Form.Fields>
        )
        const result = visibility(tree, { y: true })
        expect(result.hasRules).toBe(true)
        // disabledWhen never hides
        expect(result.hiddenPaths.size).toBe(0)
    })

    test('true when a field carries requiredWhen', () => {
        const tree = (
            <Form.Fields>
                <TextInput name="x" label="X" requiredWhen={{ field: 'y', is: true }} />
            </Form.Fields>
        )
        const result = visibility(tree, { y: true })
        expect(result.hasRules).toBe(true)
        expect(result.hiddenPaths.size).toBe(0)
    })

    test('true when a Form.When node is present even with no field rules', () => {
        const tree = (
            <Form.Fields>
                <Form.When rule={{ field: 'a', is: true }}>
                    <TextInput name="x" label="X" />
                </Form.When>
            </Form.Fields>
        )
        expect(scanFormChildren(tree).hasRules).toBe(true)
    })

    test('true when an ArrayInput uses a function row-template (opaque to the scan)', () => {
        // Inner rule props are invisible until eval, so hasRules must be
        // conservative — otherwise U4 would fast-path past a hidden row field (R4).
        const tree = (
            <Form.Fields>
                <ArrayInput name="rows" label="Rows">
                    {(_r, _i) => (
                        <TextInput name="x" label="X" visibleWhen={{ field: 'y', is: true }} />
                    )}
                </ArrayInput>
            </Form.Fields>
        )
        expect(scanFormChildren(tree).hasRules).toBe(true)
    })
})

describe('transparent wrappers', () => {
    test('Fragments and plain DOM are walked through', () => {
        const tree = (
            <>
                <div className="wrapper">
                    <TextInput name="a" label="A" visibleWhen={{ field: 'show', is: true }} />
                </div>
                <TextInput name="b" label="B" />
            </>
        )
        const { scannedPaths, hiddenPaths } = visibility(tree, { show: false })
        expect(scannedPaths).toEqual(new Set(['a', 'b']))
        expect(hiddenPaths).toEqual(new Set(['a']))
    })
})

describe('identity (copy-on-write)', () => {
    test('untouched payload branches are the same references (toBe)', () => {
        const tree = (
            <Form.Fields>
                <ArrayInput name="variants" label="Variants">
                    <TextInput
                        name="discount"
                        label="Discount"
                        visibleWhen={{ field: 'has_discount', is: true }}
                    />
                </ArrayInput>
            </Form.Fields>
        )
        const sibling = { keep: true }
        const file = { name: 'a.png', size: 10 }
        const row1 = { has_discount: true, discount: '5' }
        const values = {
            other: sibling,
            avatar: file,
            variants: [{ has_discount: false, discount: '1' }, row1],
        }

        const { hiddenPaths } = visibility(tree, values)
        expect(hiddenPaths).toEqual(new Set(['variants.0.discount']))

        const payload = omitHiddenValues(values, hiddenPaths, new Set()) as typeof values
        // sibling branches untouched
        expect(payload.other).toBe(sibling)
        expect(payload.avatar).toBe(file)
        // the untouched row keeps its reference; the touched row is a fresh copy
        expect(payload.variants[1]).toBe(row1)
        expect(payload.variants[0]).not.toBe(values.variants[0])
    })

    test('omitHiddenValues with an all-kept hidden set returns the same object', () => {
        const values = { a: 1, b: 2 }
        // hidden but kept → nothing to omit → same reference (omitPaths identity)
        expect(omitHiddenValues(values, new Set(['a']), new Set(['a']))).toBe(values)
    })

    test('omitHiddenValues with an empty hidden set returns the same object', () => {
        const values = { a: 1 }
        expect(omitHiddenValues(values, new Set(), new Set())).toBe(values)
    })
})

describe('scan does not render or call hooks', () => {
    test('scanning a tree of real inputs produces no React act warnings and needs no provider', () => {
        const warn = spyWarn()
        const tree = (
            <Form.Fields>
                <SelectInput name="type" label="Type" />
                <Form.When rule={{ field: 'type', is: 'legal' }}>
                    <TextInput name="inn" label="INN" />
                </Form.When>
                <ArrayInput name="rows" label="Rows">
                    {(_r, _i) => <TextInput name="x" label="X" />}
                </ArrayInput>
            </Form.Fields>
        )
        // No Form/ThemeProvider mounted: if scanFormChildren rendered or called
        // hooks, useForm() would throw. It must not.
        const scan = scanFormChildren(tree)
        expect(() => evaluateVisibility(scan, { type: 'legal', rows: [{}] })).not.toThrow()
        expect(warn).not.toHaveBeenCalled()
    })
})
