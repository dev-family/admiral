import React, { forwardRef, memo, useCallback, useEffect, useState } from 'react'
import cn from 'classnames'
import Radio from './Radio'
import { ChoiceChangeEvent } from '../Choice/interfaces'
import { RadioGroupProps } from './interfaces'
import styles from './Radio.module.scss'

const InternalRadioGroup: React.ForwardRefRenderFunction<HTMLDivElement, RadioGroupProps> = (
    props,
    ref,
) => {
    const {
        options = [],
        defaultValue,
        onChange,
        className,
        style,
        disabled,
        value: valueFromProps,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        ...restProps
    } = props

    const [value, setValue] = useState(
        typeof valueFromProps === 'undefined' ? defaultValue : valueFromProps,
    )

    useEffect(() => {
        if (valueFromProps !== undefined || value !== valueFromProps) {
            setValue(valueFromProps)
        }
    }, [valueFromProps])

    const _onChange = useCallback(
        (e: ChoiceChangeEvent) => {
            setValue(e.target.value)

            onChange?.(e)
        },
        [onChange],
    )

    let childrenNode: React.ReactNode

    if (options && options.length > 0) {
        childrenNode = options.map((option) => {
            if (typeof option === 'string' || typeof option === 'number') {
                return (
                    <Radio
                        key={`radio-value-${option}`}
                        disabled={disabled}
                        value={option}
                        defaultChecked={defaultValue == option}
                        checked={value === option}
                        type="radio"
                        onChange={_onChange}
                        {...restProps}
                    >
                        {option}
                    </Radio>
                )
            }

            return (
                <Radio
                    key={`radio-value-${option.value}`}
                    disabled={disabled}
                    value={option.value}
                    defaultChecked={defaultValue == option.value}
                    checked={value === option.value}
                    type="radio"
                    onChange={_onChange}
                    {...restProps}
                >
                    {option.label}
                </Radio>
            )
        })
    }

    return (
        <div
            className={cn(styles.radio__Group, className)}
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={onFocus}
            onBlur={onBlur}
            ref={ref}
        >
            {childrenNode}
        </div>
    )
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(InternalRadioGroup)
export default memo(RadioGroup) as typeof RadioGroup
