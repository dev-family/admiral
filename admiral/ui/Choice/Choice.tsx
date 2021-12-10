import React, { forwardRef, useState, memo, useRef, useEffect } from 'react'
import mergeRefs from 'react-merge-refs'
import styles from './Choice.module.scss'
import cn from 'classnames'

export interface ChoiceChangeEventTarget extends ChoiceProps {
    checked: boolean
}

export interface ChoiceChangeEvent {
    target: ChoiceChangeEventTarget
    event: Event
}

export interface ChoiceProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    classNames?: { wrapper?: string; input?: string; inner?: string }
    view?: 'primary' | 'ghost'
    indeterminate?: boolean
    onChange?: (e: ChoiceChangeEvent) => void
}

const InternalChoice: React.ForwardRefRenderFunction<HTMLInputElement, ChoiceProps> = (
    props,
    outerRef,
) => {
    const {
        checked: checkedFromProps,
        defaultChecked: defaultCheckedFromProps = false,
        type = 'checkbox',
        view = 'primary',
        disabled,
        onChange,
        style,
        classNames,
        indeterminate = false,
        ...restProps
    } = props

    const [checked, setChecked] = useState(checkedFromProps ?? defaultCheckedFromProps)
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (typeof checkedFromProps === 'boolean' && checkedFromProps !== checked) {
            setChecked(checkedFromProps)
        }
    }, [checkedFromProps])

    const _onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (disabled) {
            return
        }

        if (typeof checkedFromProps !== 'boolean') {
            setChecked(e.target.checked)
        }

        if (onChange) {
            onChange({
                target: {
                    ...props,
                    checked: e.target.checked,
                },
                event: e.nativeEvent,
            })
        }
    }

    return (
        <span
            className={cn(styles.wrapper, classNames?.wrapper, {
                [styles.wrapper__Radio]: type === 'radio',
                [styles.wrapper__Indeterminate]: type !== 'radio' && indeterminate,
                [styles.wrapper__Ghost]: view === 'ghost',
            })}
            style={style}
        >
            <input
                {...restProps}
                type={type}
                checked={checked}
                ref={mergeRefs([ref, outerRef])}
                className={cn(styles.input, classNames?.input)}
                onChange={_onChange}
                disabled={disabled}
            />
            <span className={cn(styles.inner, classNames?.inner)} />
        </span>
    )
}

const Choice = forwardRef<HTMLInputElement, ChoiceProps>(InternalChoice)
export default memo(Choice) as typeof Choice
