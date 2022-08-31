import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from '../FormContext'
import { Form } from '../Form'
import { Input } from '../../ui'
import type { InputProps } from '../../ui/Input/interfaces'
import { FormItemProps } from '../Item'
import slugify from 'slugify'
import { InputComponentWithName } from '../interfaces'
import { FiLock, FiUnlock } from 'react-icons/fi'
import cn from 'classnames'
import styles from '../Form.module.scss'

export interface SlugInputProps extends InputProps, FormItemProps {
    name: string
    from: string
    options?: SlygifyOptions
}

export type SlygifyOptions = {
    replacement?: string
    remove?: RegExp
    lower?: boolean
    strict?: boolean
    locale?: string
    trim?: boolean
}

export const SlugInput: InputComponentWithName<React.FC<SlugInputProps>> = ({
    name,
    label,
    from,
    required,
    disabled,
    columnSpan,
    options,
    size,
    ...inputProps
}) => {
    const { values, errors, setValues } = useForm()
    const value = values[name]
    const error = errors[name]?.[0]
    const fromFieldValue = values[from]

    const [isLocked, setIsLocked] = useState(disabled)

    useEffect(() => {
        if (isLocked) {
            return
        }

        if (fromFieldValue) {
            onChange({
                target: {
                    value: slugify(fromFieldValue, {
                        lower: true,
                        replacement: '-',
                        ...options,
                    }),
                },
            })
            return
        }
        onChange({
            target: {
                value: null,
            },
        })
    }, [fromFieldValue])

    const onChange = useCallback((e) => {
        setValues((values: any) => ({ ...values, [name]: e.target.value }))
    }, [])

    return (
        <Form.Item label={label} required={required} error={error} columnSpan={columnSpan}>
            <Input
                {...inputProps}
                readOnly={isLocked}
                name={name}
                value={value}
                onChange={onChange}
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

SlugInput.inputName = 'SlugInput'
