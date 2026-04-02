import React, { useState, memo, useRef, useEffect } from 'react'
import { useMergeRefs } from '@floating-ui/react'
import cn from 'classnames'
import styles from './Choice.module.scss'
import { ChoiceProps } from './interfaces'

function InternalChoice({
    ref: outerRef,
    ...props
}: ChoiceProps & { ref?: React.Ref<HTMLInputElement> }) {
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
    const mergedRef = useMergeRefs([ref, outerRef ?? null])

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
                ref={mergedRef}
                className={cn(styles.input, classNames?.input)}
                onChange={_onChange}
                disabled={disabled}
            />
            <span className={cn(styles.inner, classNames?.inner)} />
        </span>
    )
}

const Choice = InternalChoice
export default memo(Choice) as typeof Choice
