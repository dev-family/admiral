import React from 'react'
import { useTransition, animated } from 'react-spring'
import styles from './Form.module.scss'
import cn from 'classnames'

type ItemProps = {
    label?: string
    error?: string
    required?: boolean
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

const Item: React.FC<ItemProps> = ({ label, required = false, error, children }) => {
    return (
        <div className={styles.item}>
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
