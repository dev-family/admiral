import React, { forwardRef, useRef, memo } from 'react'
import { CardProps } from './interfaces'
import styles from './Card.module.scss'
import mergeRefs from 'react-merge-refs'
import cn from 'classnames'

const Card = forwardRef((props: CardProps, cardRef) => {
    const {
        component: Component = 'div',
        className,
        verticalSpace = '3xl',
        horizontalSpace = '3xl',
        form = 'round',
        shadow = true,
        children,
        ...rest
    } = props
    const ref = useRef<typeof Component>(null)

    const content = <div className={styles.content}>{children}</div>

    return (
        <Component
            ref={mergeRefs([ref, cardRef])}
            className={cn(
                styles.card,
                {
                    [styles.card__FormSquare]: form === 'square',
                    [styles.card__NoShadow]: !shadow,
                    [styles.card__SpaceVerticalXS]: verticalSpace === 'xs',
                    [styles.card__SpaceVerticalS]: verticalSpace === 's',
                    [styles.card__SpaceVerticalM]: verticalSpace === 'm',
                    [styles.card__SpaceVerticalL]: verticalSpace === 'l',
                    [styles.card__SpaceVerticalXL]: verticalSpace === 'xl',
                    [styles.card__SpaceVertical2XL]: verticalSpace === '2xl',
                    [styles.card__SpaceVertical3XL]: verticalSpace === '3xl',
                    [styles.card__SpaceVertical4XL]: verticalSpace === '4xl',
                    [styles.card__SpaceVertical5XL]: verticalSpace === '5xl',
                    [styles.card__SpaceHorizontalXS]: horizontalSpace === 'xs',
                    [styles.card__SpaceHorizontalS]: horizontalSpace === 's',
                    [styles.card__SpaceHorizontalM]: horizontalSpace === 'm',
                    [styles.card__SpaceHorizontalL]: horizontalSpace === 'l',
                    [styles.card__SpaceHorizontalXL]: horizontalSpace === 'xl',
                    [styles.card__SpaceHorizontal2XL]: horizontalSpace === '2xl',
                    [styles.card__SpaceHorizontal3XL]: horizontalSpace === '3xl',
                    [styles.card__SpaceHorizontal4XL]: horizontalSpace === '4xl',
                    [styles.card__SpaceHorizontal5XL]: horizontalSpace === '5xl',
                },
                className,
            )}
            {...rest}
        >
            {content}
        </Component>
    )
})

export default memo(Card) as typeof Card
