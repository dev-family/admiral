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
import mergeRefs from 'react-merge-refs'
import TextareaAutosize from 'react-textarea-autosize'
import throttle from 'lodash.throttle'
import cn from 'classnames'
import { TextareaProps } from './interfaces'
import styles from './Textarea.module.scss'

const Textarea = forwardRef((props: TextareaProps, textareaRef) => {
    const [key, setKey] = useState(Math.random())
    const { size = 'M', alert = false, borderless = false, onChange, disabled = false } = props

    useEffect(() => {
        const handleResize = () => {
            setKey(Math.random())
        }
        const throttled = throttle(handleResize, 300)
        window.addEventListener('resize', throttled)
        return () => {
            window.removeEventListener('resize', throttled)
        }
    }, [])

    const ref = useRef<HTMLTextAreaElement>(null)

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
                ref={mergeRefs([ref, textareaRef])}
                value={fixControlledValue(value)}
                onChange={_onChange}
                disabled={disabled}
                className={styles.textarea}
            />
        </div>
    )
})

export function fixControlledValue<T>(value: T) {
    if (typeof value === 'undefined' || value === null) {
        return ''
    }
    return String(value)
}

export default memo(Textarea) as typeof Textarea
