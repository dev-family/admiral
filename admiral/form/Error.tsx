import React from 'react'
import { useTransition, animated } from 'react-spring'
import styles from './Form.module.scss'

export interface FormErrorProps {
    error?: string
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

const Error: React.FC<FormErrorProps> = ({ error }) => {
    return (
        <AnimatePresence show={!!error}>
            <div className={styles.item_Error}>{error}</div>
        </AnimatePresence>
    )
}

export default Error
