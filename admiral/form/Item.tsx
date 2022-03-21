import React from 'react'
import { useTransition, animated } from 'react-spring'
import styles from './Form.module.scss'
import cn from 'classnames'

export interface FormItemProps {
    label?: string
    error?: string
    required?: boolean
    columnSpan?: 1 | 2
}

const AnimatePresence: React.FC<{ show: boolean }> = ({ show, children }) => {
    const transitions = useTransition(show, {
        from: { opacity: 0, translateY: 4 },
        enter: { opacity: 1, translateY: 0 },
        reverse: show,
        config: { tension: 90, friction: 10, precision: 0.1, duration: 160 },
    })
    return transitions(
        (styles, item) => item && <animated.div style={styles}>{children}</animated.div>,
    )
}

const Item: React.FC<FormItemProps> = ({
    label,
    required = false,
    error,
    columnSpan = 1,
    children,
}) => {
    return (
        <div className={cn(styles.item, { [styles.item__ColumnSpanTwo]: columnSpan === 2 })}>
            <label>
                <span
                    className={cn(styles.item_Label, { [styles.item_Label__Required]: required })}
                >
                    {label}
                </span>
                <div className={styles.item_Field}>{children}</div>
            </label>

            <AnimatePresence show={!!error}>
                <div className={styles.item_Error}>{error}</div>
            </AnimatePresence>
        </div>
    )
}

export default Item
