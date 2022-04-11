import React, {
    useState,
    useEffect,
    forwardRef,
    useRef,
    memo,
    useCallback,
    ChangeEventHandler,
} from 'react'
import omit from 'rc-util/lib/omit'
import { InputProps } from './interfaces'
import styles from './Input.module.scss'
import mergeRefs from 'react-merge-refs'
import cn from 'classnames'

// TODO: add prefix/suffix functionality

const Input = forwardRef((props: InputProps, inputRef) => {
    const {
        size = 'M',
        alert = false,
        borderless = false,
        onChange,
        disabled = false,
        type = 'text',
        inputMode = 'text',
        suffix,
    } = props
    const ref = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState(
        typeof props.value === 'undefined' ? props.defaultValue : props.value,
    )

    useEffect(() => {
        if (props.value !== undefined || value !== props.value) {
            setValue(props.value)
        }
    }, [props.value])

    const _onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value)
            if (onChange) onChange(e)
        },
        [onChange],
    )

    const inputProps = omit(props, ['defaultValue', 'size', 'borderless', 'alert'])

    return (
        <div
            className={cn(styles.wrapper, {
                [styles.wrapper__SizeL]: size === 'L',
                [styles.wrapper__SizeS]: size === 'S',
                [styles.wrapper__SizeXS]: size === 'XS',
                [styles.wrapper__Alert]: alert,
                [styles.wrapper__Clear]: borderless,
                [styles.wrapper__Disabled]: disabled,
                [styles.wrapper__Suffix]: !!suffix,
            })}
        >
            <input
                {...inputProps}
                value={fixControlledValue(value)}
                type={type}
                inputMode={inputMode}
                ref={mergeRefs([ref, inputRef])}
                onChange={_onChange}
                disabled={disabled}
                className={cn(styles.input)}
            />
            {suffix}
        </div>
    )
})

export function fixControlledValue<T>(value: T) {
    if (typeof value === 'undefined' || value === null) {
        return ''
    }
    return String(value)
}

export default memo(Input) as typeof Input
