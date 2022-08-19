import React from 'react'
import { animated } from 'react-spring'
import cn from 'classnames'
import { cloneElement } from './utils'
import SingleNumber from './SingleNumber'
import styles from './Badge.module.scss'

export interface ScrollNumberProps {
    className?: string
    count?: string | number | null
    children?: React.ReactElement<HTMLElement>
    component?: string
    style?: any
    show: boolean
}

export interface ScrollNumberState {
    animateStarted?: boolean
    count?: string | number | null
}

const ScrollNumber: React.FC<ScrollNumberProps> = ({
    count,
    className,
    style,
    show,
    component = 'sup',
    children,
    ...restProps
}) => {
    const newProps = {
        ...restProps,
        style,
        className: cn(styles.scrollNumber, className),
    }

    // Only integer need motion
    let numberNodes: React.ReactNode = count
    if (count && Number(count) % 1 === 0) {
        const numberList = String(count).split('')

        numberNodes = numberList.map((num, i) => (
            <SingleNumber count={Number(count)} value={num} key={numberList.length - i} />
        ))
    }

    if (children) {
        return cloneElement(children, (oriProps: any) => ({
            className: cn(styles.scrollNumber_Custom, oriProps?.className),
        }))
    }

    return <animated.sup {...newProps}>{numberNodes}</animated.sup>
}

export default ScrollNumber
