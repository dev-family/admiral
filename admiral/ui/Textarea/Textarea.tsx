import React, { useState, useEffect, useRef, memo, useCallback, ChangeEventHandler } from 'react'
import omit from 'rc-util/es/omit'
import { useMergeRefs } from '@floating-ui/react'
import TextareaAutosize from 'react-textarea-autosize'
import cn from 'classnames'
import { TextareaProps } from './interfaces'
import styles from './Textarea.module.scss'

function Textarea({ ref, ...props }: TextareaProps & { ref?: React.Ref<HTMLTextAreaElement> }) {
    const [key, setKey] = useState(Math.random())
    const { size = 'M', alert = false, borderless = false, onChange, disabled = false } = props

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | null = null
        let lastCall = 0
        const handleResize = () => {
            const now = Date.now()
            const remaining = 300 - (now - lastCall)
            if (remaining <= 0) {
                lastCall = now
                setKey(Math.random())
            } else if (!timer) {
                timer = setTimeout(() => {
                    lastCall = Date.now()
                    timer = null
                    setKey(Math.random())
                }, remaining)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
            if (timer) clearTimeout(timer)
        }
    }, [])

    const internalRef = useRef<HTMLTextAreaElement>(null)
    const mergedRef = useMergeRefs([internalRef, ref ?? null])

    const [value, setValue] = useState(
        typeof props.value === 'undefined' ? props.defaultValue : props.value,
    )

    useEffect(() => {
        if (props.value !== undefined || value !== props.value) {
            setValue(props.value)
        }
    }, [props.value])

    const _onChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setValue(e.target.value)
            if (onChange) onChange(e)
        },
        [onChange],
    )

    const textareaProps = omit(props, ['defaultValue', 'size', 'borderless', 'alert'])

    return (
        <div
            className={cn(styles.wrapper, {
                [styles.wrapper__SizeL]: size === 'L',
                [styles.wrapper__SizeS]: size === 'S',
                [styles.wrapper__SizeXS]: size === 'XS',
                [styles.wrapper__Alert]: alert,
                [styles.wrapper__Clear]: borderless,
                [styles.wrapper__Disabled]: disabled,
            })}
        >
            <TextareaAutosize
                key={key}
                cacheMeasurements
                {...textareaProps}
                ref={mergedRef}
                value={fixControlledValue(value)}
                onChange={_onChange}
                disabled={disabled}
                className={styles.textarea}
            />
        </div>
    )
}

export function fixControlledValue<T>(value: T) {
    if (typeof value === 'undefined' || value === null) {
        return ''
    }
    return String(value)
}

export default memo(Textarea) as typeof Textarea
