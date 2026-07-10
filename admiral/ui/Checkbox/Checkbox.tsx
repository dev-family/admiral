import React, { memo } from 'react'
import { Choice } from '../Choice'
import cn from 'classnames'
import { ChoiceProps } from '../Choice/interfaces'
import { CheckboxProps } from './interfaces'
import styles from './Checkbox.module.scss'

function Checkbox({
    className,
    children,
    style,
    onMouseEnter,
    onMouseLeave,
    size,
    align = 'top',
    ref,
    ...restProps
}: CheckboxProps & { ref?: React.Ref<HTMLInputElement> }) {
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

export default memo(Checkbox) as typeof Checkbox
