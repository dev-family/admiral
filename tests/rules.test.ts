import { afterEach, describe, expect, test, vi } from 'vitest'
import {
    compileRule,
    getValueByPath,
    isEmptyValue,
    matchesField,
    omitPaths,
    type Primitive,
    type Rule,
} from '../admiral/form/rules'

afterEach(() => {
    vi.restoreAllMocks()
})

const spyWarn = () => vi.spyOn(console, 'warn').mockImplementation(() => {})

// The full value matrix every operator is exercised against.
const MATRIX: Record<string, unknown> = {
    undefined: undefined,
    null: null,
    emptyString: '',
    zero: 0,
    false: false,
    emptyArray: [],
    emptyObject: {},
    stringA: 'a',
    one: 1,
    nan: NaN,
}

const evalWith = (rule: Rule, value: unknown) => compileRule(rule)({ f: value })

describe('isEmptyValue (KTD6 matrix)', () => {
    test('undefined / null / "" / [] are empty', () => {
        expect(isEmptyValue(undefined)).toBe(true)
        expect(isEmptyValue(null)).toBe(true)
        expect(isEmptyValue('')).toBe(true)
        expect(isEmptyValue([])).toBe(true)
    })

    test('0 / false / {} / non-empty array / non-empty string are NOT empty', () => {
        expect(isEmptyValue(0)).toBe(false)
        expect(isEmptyValue(false)).toBe(false)
        expect(isEmptyValue({})).toBe(false)
        expect(isEmptyValue([1])).toBe(false)
        expect(isEmptyValue('a')).toBe(false)
        expect(isEmptyValue(NaN)).toBe(false)
    })
})

describe('getValueByPath', () => {
    test('exact key takes priority over dot-path traversal', () => {
        expect(getValueByPath({ 'seo.title': 1 }, 'seo.title')).toBe(1)
        // exact key wins even when a nested object could also resolve it
        expect(getValueByPath({ 'seo.title': 1, seo: { title: 2 } }, 'seo.title')).toBe(1)
    })

    test('dot-path traversal of nested objects', () => {
        expect(getValueByPath({ name: { en: 'x' } }, 'name.en')).toBe('x')
    })

    test('numeric segments index arrays', () => {
        expect(getValueByPath({ items: [{ x: 1 }, { x: 2 }] }, 'items.0.x')).toBe(1)
        expect(getValueByPath({ items: [{ x: 1 }, { x: 2 }] }, 'items.1.x')).toBe(2)
    })

    test('missing intermediate yields undefined (no throw)', () => {
        expect(getValueByPath({}, 'name.en')).toBeUndefined()
        expect(getValueByPath({ name: undefined }, 'name.en')).toBeUndefined()
        expect(getValueByPath({ items: [{ x: 1 }] }, 'items.5.x')).toBeUndefined()
    })

    test('flat top-level key', () => {
        expect(getValueByPath({ type: 'legal' }, 'type')).toBe('legal')
    })
})

describe('condition: is', () => {
    test('strict equality across the value matrix', () => {
        expect(evalWith({ field: 'f', is: 'a' }, 'a')).toBe(true)
        expect(evalWith({ field: 'f', is: 'a' }, 'b')).toBe(false)
        expect(evalWith({ field: 'f', is: 1 }, 1)).toBe(true)
        expect(evalWith({ field: 'f', is: 1 }, '1')).toBe(false) // no coercion
        expect(evalWith({ field: 'f', is: 0 }, 0)).toBe(true)
        expect(evalWith({ field: 'f', is: false }, false)).toBe(true)
        expect(evalWith({ field: 'f', is: false }, 0)).toBe(false) // strict
        expect(evalWith({ field: 'f', is: null }, null)).toBe(true)
        expect(evalWith({ field: 'f', is: '' }, '')).toBe(true)
        // NaN !== NaN
        expect(evalWith({ field: 'f', is: NaN as unknown as number }, NaN)).toBe(false)
    })

    test('is on an array value is always false (use `in` for multiselects)', () => {
        expect(evalWith({ field: 'f', is: 'a' }, ['a'])).toBe(false)
        expect(evalWith({ field: 'f', is: 1 }, [1])).toBe(false)
    })
})

describe('condition: not', () => {
    test('strict inequality is the inverse of `is`', () => {
        expect(evalWith({ field: 'f', not: 'a' }, 'a')).toBe(false)
        expect(evalWith({ field: 'f', not: 'a' }, 'b')).toBe(true)
        expect(evalWith({ field: 'f', not: 1 }, '1')).toBe(true)
        expect(evalWith({ field: 'f', not: false }, 0)).toBe(true)
    })

    test('not on an array value is always true (inverse of is→false)', () => {
        expect(evalWith({ field: 'f', not: 'a' }, ['a'])).toBe(true)
    })
})

describe('condition: in', () => {
    test('membership in the operand array', () => {
        expect(evalWith({ field: 'f', in: ['a', 'b'] }, 'a')).toBe(true)
        expect(evalWith({ field: 'f', in: ['a', 'b'] }, 'c')).toBe(false)
        expect(evalWith({ field: 'f', in: [0, 1] }, 0)).toBe(true)
        expect(evalWith({ field: 'f', in: [false] }, false)).toBe(true)
        expect(evalWith({ field: 'f', in: ['a'] }, undefined)).toBe(false)
    })

    test('non-array operand → false + exactly one warn per rule object', () => {
        const warn = spyWarn()
        const rule = { field: 'f', in: 'a' as unknown as Primitive[] }
        const predicate = compileRule(rule)
        expect(predicate({ f: 'a' })).toBe(false)
        expect(predicate({ f: 'a' })).toBe(false)
        expect(warn).toHaveBeenCalledTimes(1)
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('[Admiral]'))
    })
})

describe('condition: empty', () => {
    test('empty:true matches the empty matrix, fails the non-empty matrix', () => {
        for (const key of ['undefined', 'null', 'emptyString', 'emptyArray']) {
            expect(evalWith({ field: 'f', empty: true }, MATRIX[key])).toBe(true)
        }
        for (const key of ['zero', 'false', 'emptyObject', 'stringA', 'one', 'nan']) {
            expect(evalWith({ field: 'f', empty: true }, MATRIX[key])).toBe(false)
        }
    })

    test('empty:false is the inverse', () => {
        expect(evalWith({ field: 'f', empty: false }, '')).toBe(false)
        expect(evalWith({ field: 'f', empty: false }, 0)).toBe(true)
        expect(evalWith({ field: 'f', empty: false }, 'a')).toBe(true)
        expect(evalWith({ field: 'f', empty: false }, [])).toBe(false)
    })
})

describe('conditions: gt / gte / lt / lte', () => {
    test('strictly numeric comparison', () => {
        expect(evalWith({ field: 'f', gt: 5 }, 6)).toBe(true)
        expect(evalWith({ field: 'f', gt: 5 }, 5)).toBe(false)
        expect(evalWith({ field: 'f', gte: 5 }, 5)).toBe(true)
        expect(evalWith({ field: 'f', lt: 5 }, 4)).toBe(true)
        expect(evalWith({ field: 'f', lt: 5 }, 5)).toBe(false)
        expect(evalWith({ field: 'f', lte: 5 }, 5)).toBe(true)
        expect(evalWith({ field: 'f', gt: 0 }, -1)).toBe(false)
        expect(evalWith({ field: 'f', gt: -1 }, 0)).toBe(true)
    })

    test('string field value → false + warn (no coercion)', () => {
        const warn = spyWarn()
        expect(evalWith({ field: 'f', gt: 5 }, '6')).toBe(false)
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('[Admiral]'))
    })

    test('Date field value → false + warn (no coercion)', () => {
        const warn = spyWarn()
        expect(evalWith({ field: 'f', gt: 0 }, new Date())).toBe(false)
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('[Admiral]'))
    })

    test('NaN field value → false + warn', () => {
        const warn = spyWarn()
        expect(evalWith({ field: 'f', gt: 5 }, NaN)).toBe(false)
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('[Admiral]'))
    })

    test('non-finite operand → false + warn', () => {
        const warn = spyWarn()
        expect(evalWith({ field: 'f', gt: Infinity }, 5)).toBe(false)
        expect(evalWith({ field: 'f', gt: NaN as unknown as number }, 5)).toBe(false)
        expect(warn).toHaveBeenCalled()
    })

    test('warns at most once per rule object', () => {
        const warn = spyWarn()
        const rule = { field: 'f', gt: 5 }
        const predicate = compileRule(rule)
        predicate({ f: 'x' })
        predicate({ f: 'y' })
        predicate({ f: 'z' })
        expect(warn).toHaveBeenCalledTimes(1)
    })
})

describe('combinators', () => {
    test('and: all sub-rules must hold', () => {
        const rule: Rule = {
            and: [
                { field: 'a', is: 1 },
                { field: 'b', is: 2 },
            ],
        }
        const predicate = compileRule(rule)
        expect(predicate({ a: 1, b: 2 })).toBe(true)
        expect(predicate({ a: 1, b: 3 })).toBe(false)
    })

    test('or: at least one sub-rule must hold', () => {
        const rule: Rule = {
            or: [
                { field: 'a', is: 1 },
                { field: 'b', is: 2 },
            ],
        }
        const predicate = compileRule(rule)
        expect(predicate({ a: 1, b: 9 })).toBe(true)
        expect(predicate({ a: 9, b: 2 })).toBe(true)
        expect(predicate({ a: 9, b: 9 })).toBe(false)
    })

    test('not-combinator (no `field` key) inverts its sub-rule', () => {
        const rule: Rule = { not: { field: 'a', is: 1 } }
        const predicate = compileRule(rule)
        expect(predicate({ a: 1 })).toBe(false)
        expect(predicate({ a: 2 })).toBe(true)
    })

    test('not-combinator vs not-condition are distinguished by the `field` key', () => {
        // condition: { field, not } — strict inequality
        expect(evalWith({ field: 'f', not: 1 }, 2)).toBe(true)
        expect(evalWith({ field: 'f', not: 1 }, 1)).toBe(false)
        // combinator: { not: Rule } — inversion
        const combinator: Rule = { not: { field: 'f', is: 1 } }
        expect(compileRule(combinator)({ f: 1 })).toBe(false)
        expect(compileRule(combinator)({ f: 2 })).toBe(true)
    })

    test('nested and/or/not three levels deep', () => {
        const rule: Rule = {
            and: [
                { field: 'type', is: 'legal' },
                {
                    or: [
                        { field: 'country', in: ['ru', 'by'] },
                        { not: { field: 'vip', is: true } },
                    ],
                },
            ],
        }
        const predicate = compileRule(rule)
        expect(predicate({ type: 'legal', country: 'ru', vip: true })).toBe(true)
        expect(predicate({ type: 'legal', country: 'us', vip: false })).toBe(true)
        expect(predicate({ type: 'legal', country: 'us', vip: true })).toBe(false)
        expect(predicate({ type: 'person', country: 'ru', vip: false })).toBe(false)
    })
})

describe('dot-path resolution inside conditions', () => {
    test('name.en', () => {
        expect(evalWith({ field: 'name.en' as string, is: 'x' } as Rule, undefined)).toBe(false)
        expect(compileRule({ field: 'name.en', is: 'x' })({ name: { en: 'x' } })).toBe(true)
    })

    test('items.0.x', () => {
        expect(compileRule({ field: 'items.0.x', is: 1 })({ items: [{ x: 1 }] })).toBe(true)
        expect(compileRule({ field: 'items.1.x', is: 1 })({ items: [{ x: 1 }] })).toBe(false)
    })

    test('missing intermediate resolves to undefined and stays well-defined', () => {
        expect(compileRule({ field: 'a.b.c', empty: true })({})).toBe(true)
        expect(compileRule({ field: 'a.b.c', is: 1 })({})).toBe(false)
    })

    test('exact-key priority: scope { "seo.title": 1 } resolves by the flat key', () => {
        expect(compileRule({ field: 'seo.title', is: 1 })({ 'seo.title': 1 })).toBe(true)
    })
})

describe('malformed rules → fail-open (true) + exactly one warn per object', () => {
    test('empty object {}', () => {
        const warn = spyWarn()
        const rule = {} as Rule
        const predicate = compileRule(rule)
        expect(predicate({})).toBe(true)
        expect(predicate({})).toBe(true)
        expect(warn).toHaveBeenCalledTimes(1)
        expect(warn).toHaveBeenCalledWith(expect.stringContaining('[Admiral]'))
    })

    test('typo in field key { feild: "x", is: 1 }', () => {
        const warn = spyWarn()
        const rule = { feild: 'x', is: 1 } as unknown as Rule
        expect(compileRule(rule)({ x: 1 })).toBe(true)
        expect(warn).toHaveBeenCalledTimes(1)
    })

    test('field with no operator { field: "x" }', () => {
        const warn = spyWarn()
        const rule = { field: 'x' } as unknown as Rule
        expect(compileRule(rule)({ x: 1 })).toBe(true)
        expect(warn).toHaveBeenCalledTimes(1)
    })

    test('null / non-object rule fails open', () => {
        const warn = spyWarn()
        expect(compileRule(null as unknown as Rule)({})).toBe(true)
        expect(warn).toHaveBeenCalled()
    })
})

describe('compileRule', () => {
    test('passes functions through unchanged', () => {
        const fn = (values: Record<string, unknown>) => values.x === 1
        expect(compileRule(fn)).toBe(fn)
    })

    test('memoizes by object reference: same object → same predicate (toBe)', () => {
        const rule: Rule = { field: 'f', is: 1 }
        expect(compileRule(rule)).toBe(compileRule(rule))
    })

    test('a structurally-equal new object yields a new predicate', () => {
        const a: Rule = { field: 'f', is: 1 }
        const b: Rule = { field: 'f', is: 1 }
        expect(compileRule(a)).not.toBe(compileRule(b))
    })
})

describe('omitPaths', () => {
    test('removes a top-level key without mutating the source', () => {
        const source = { a: 1, b: 2 }
        const result = omitPaths(source, ['a'])
        expect(result).toEqual({ b: 2 })
        expect(source).toEqual({ a: 1, b: 2 })
        expect(result).not.toBe(source)
    })

    test('nested removal items.2.discount does not mutate the source', () => {
        const source = {
            items: [{ x: 0 }, { x: 1 }, { x: 2, discount: 50 }],
            other: { keep: true },
        }
        const result = omitPaths(source, ['items.2.discount'])

        expect(result).toEqual({
            items: [{ x: 0 }, { x: 1 }, { x: 2 }],
            other: { keep: true },
        })
        // source untouched
        expect((source.items[2] as Record<string, unknown>).discount).toBe(50)
    })

    test('untouched branches keep the same reference (copy-on-write)', () => {
        const source = {
            items: [{ x: 0 }, { x: 1 }, { x: 2, discount: 50 }],
            other: { keep: true },
            list: [1, 2, 3],
        }
        const result = omitPaths(source, ['items.2.discount'])

        // sibling branches are NOT cloned
        expect(result.other).toBe(source.other)
        expect(result.list).toBe(source.list)
        // sibling rows inside the touched array are NOT cloned
        expect((result.items as unknown[])[0]).toBe(source.items[0])
        expect((result.items as unknown[])[1]).toBe(source.items[1])
        // the row on the removal path IS a fresh copy
        expect((result.items as unknown[])[2]).not.toBe(source.items[2])
        // ...but the containers along the path are fresh
        expect(result.items).not.toBe(source.items)
        expect(result).not.toBe(source)
    })

    test('a File-like value in a sibling key stays the same reference', () => {
        const file = { name: 'a.png', size: 10 } // File-like stand-in
        const source = { avatar: file, secret: 'x' }
        const result = omitPaths(source, ['secret'])

        expect(result.avatar).toBe(file)
        expect(result).toEqual({ avatar: file })
    })

    test('literal-key removal: flat "seo.title" key', () => {
        const source = { 'seo.title': 'x', 'seo.desc': 'y' }
        const result = omitPaths(source, ['seo.title'])

        expect(result).toEqual({ 'seo.desc': 'y' })
        expect(source).toEqual({ 'seo.title': 'x', 'seo.desc': 'y' })
    })

    test('removing a missing path is a no-op clone', () => {
        const source = { a: 1 }
        const result = omitPaths(source, ['b.c'])
        expect(result).toEqual({ a: 1 })
    })

    test('empty paths returns the source untouched (same reference)', () => {
        const source = { a: 1 }
        expect(omitPaths(source, [])).toBe(source)
    })

    test('removes multiple paths', () => {
        const source = { a: 1, b: 2, c: { d: 3, e: 4 } }
        const result = omitPaths(source, ['a', 'c.d'])
        expect(result).toEqual({ b: 2, c: { e: 4 } })
    })
})

describe('matchesField (moved from FormTabs, semantics preserved)', () => {
    test('exact key match', () => {
        expect(matchesField('name', 'name')).toBe(true)
    })

    test('prefix match on a dot-segment boundary', () => {
        expect(matchesField('name.en', 'name')).toBe(true)
        expect(matchesField('items.0.title', 'items')).toBe(true)
    })

    test('does not match a partial-name prefix', () => {
        expect(matchesField('username', 'name')).toBe(false)
        expect(matchesField('names', 'name')).toBe(false)
    })

    test('does not match an unrelated key', () => {
        expect(matchesField('surname', 'name')).toBe(false)
    })
})
