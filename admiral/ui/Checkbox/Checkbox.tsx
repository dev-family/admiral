import React, { forwardRef, memo } from 'react'
import { Choice, ChoiceChangeEvent, ChoiceProps } from '../Choice'
import styles from './Checkbox.module.scss'
import cn from 'classnames'

export interface AbstractCheckboxProps<T> {
    className?: string
    defaultChecked?: boolean
    checked?: boolean
    style?: React.CSSProperties
    disabled?: boolean
    onChange?: (e: T) => void
    onClick?: React.MouseEventHandler<HTMLElement>
    onMouseEnter?: React.MouseEventHandler<HTMLElement>
    onMouseLeave?: React.MouseEventHandler<HTMLElement>
    value?: any
    tabIndex?: number
    name?: string
    children?: React.ReactNode
    id?: string
    autoFocus?: boolean
    type?: string
}

export interface CheckboxProps extends AbstractCheckboxProps<ChoiceChangeEvent> {
    view?: 'primary' | 'ghost'
    size?: 'm' | 'l'
    align?: 'top' | 'center' | 'bottom'
    indeterminate?: boolean
}

const InternalCheckbox: React.ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
    { className, children, style, onMouseEnter, onMouseLeave, size, align = 'top', ...restProps },
    ref,
) => {
    const choiceProps: ChoiceProps = { ...restProps }

    return (
        <label
            className={cn(
                styles.checkbox,
                {
                    [styles.checkbox__Large]: size === 'l',
                    [styles.checkbox__AlignTop]: align === 'top',
                    [styles.checkbox__AlignCenter]: align === 'center',
                    [styles.checkbox__AlignBottom]: align === 'bottom',
                    [styles.checkbox__Empty]: !children,
                },
                className,
            )}
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <Choice {...choiceProps} ref={ref} />
            {children && <span>{children}</span>}
        </label>
    )
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(InternalCheckbox)
export default memo(Checkbox) as typeof Checkbox
