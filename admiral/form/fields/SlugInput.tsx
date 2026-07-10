import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FieldValues, useForm } from '../FormContext'
import { Form } from '../Form'
import { Input } from '../../ui'
import type { InputProps } from '../../ui/Input/interfaces'
import { FormItemProps } from '../Item'
import slugify from 'slugify'
import { InputComponentWithName } from '../interfaces'
import { FiLock, FiUnlock } from 'react-icons/fi'
import cn from 'classnames'
import styles from '../Form.module.scss'
import { FieldRuleProps, withFieldRules } from '../fieldRules'

export interface SlugInputProps
    extends InputProps, FormItemProps, Omit<FieldRuleProps, 'disabledWhen'> {
    name: string
    from: string
    slugLang?: string
    options?: SlygifyOptions
    onChange?: (value: any) => void
}

export type SlygifyOptions = {
    replacement?: string
    remove?: RegExp
    lower?: boolean
    strict?: boolean
    locale?: string
    trim?: boolean
}

const getFromFieldValue = (from: string, values: FieldValues, slugLang?: string) => {
    const keys = from.split('[')

    if (keys.length === 1) {
        if (slugLang) {
            return values[keys[0]]?.[slugLang]
        }
        const value = values?.[keys[0]]
        return typeof value === 'string' ? value : ''
    }
    const mainKey = keys[0]
    const subKey = keys[1].replace(']', '')
    const value = values[mainKey]?.[subKey]

    return value || ''
}

const SlugInputBase: InputComponentWithName<(props: SlugInputProps) => React.JSX.Element> =
    function SlugInput({
        name,
        label,
        from,
        required,
        disabled,
        columnSpan,
        options,
        size,
        slugLang,
        onChange,
        ...inputProps
    }: SlugInputProps) {
        const { values, errors, setValues } = useForm()
        const value = values[name]
        const error = errors[name]?.[0]
        const fromFieldValue = useMemo(
            () => getFromFieldValue(from, values, slugLang),
            [values, from, slugLang],
        )
        const [isLocked, setIsLocked] = useState(disabled)

        const _onChange = useCallback(
            (e: any) => {
                setValues((values: any) => ({ ...values, [name]: e.target.value }))
                onChange?.(e.target.value)
            },
            [name, onChange, setValues],
        )

        const makeSlug = useCallback(
            (raw: string) => slugify(raw, { lower: true, replacement: '-', ...options }),
            [options],
        )

        const prevFromValueRef = useRef<string | undefined>(undefined)

        useEffect(() => {
            const prevFromValue = prevFromValueRef.current
            prevFromValueRef.current = fromFieldValue

            if (isLocked) {
                return
            }

            // Auto-generate only while the slug is empty or still tracks the
            // source field — a pre-existing slug (e.g. loaded into an edit
            // form) must not be silently rewritten.
            const isTracking = !value || value === makeSlug(String(prevFromValue ?? ''))
            if (!isTracking) {
                return
            }

            if (fromFieldValue) {
                const slug = makeSlug(String(fromFieldValue))
                if (slug !== value) {
                    _onChange({ target: { value: slug } })
                }
                return
            }
            if (value) {
                _onChange({ target: { value: null } })
            }
        }, [fromFieldValue, isLocked, value, _onChange, makeSlug])

        return (
            <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
                <Input
                    {...inputProps}
                    readOnly={isLocked}
                    name={name}
                    value={value}
                    onChange={_onChange}
                    alert={!!error}
                    size={size}
                    className={cn(styles.slugInput, {
                        [styles.slugInput__sizeL]: size === 'L',
                        [styles.slugInput__sizeS]: size === 'S',
                        [styles.slugInput__sizeXS]: size === 'XS',
                    })}
                    suffix={
                        <button type="button" className={styles.slugInput_Icon}>
                            {isLocked ? (
                                <FiLock onClick={() => setIsLocked(false)} />
                            ) : (
                                <FiUnlock onClick={() => setIsLocked(true)} />
                            )}
                        </button>
                    }
                />
            </Form.Item>
        )
    }

SlugInputBase.inputName = 'SlugInput'

export const SlugInput = withFieldRules(SlugInputBase, { supportsDisabled: false })
