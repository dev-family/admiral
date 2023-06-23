import React from 'react'
import styles from './Form.module.scss'
import cn from 'classnames'
import Error from './Error'

export interface FormItemProps {
    label?: string
    error?: string
    showError?: boolean
    required?: boolean
    columnSpan?: 1 | 2
    onLabelClick?: React.MouseEventHandler<HTMLLabelElement>
    labelAs?: string | React.JSXElementConstructor<any>
    isQuickFilter?: boolean
}

const Item: React.FC<FormItemProps> = ({
    label,
    required = false,
    error,
    showError = true,
    columnSpan = 1,
    onLabelClick,
    labelAs: LabelComponent = 'label',
    children,
}) => {
    return (
        <div className={cn(styles.item, { [styles.item__ColumnSpanTwo]: columnSpan === 2 })}>
            <LabelComponent onClick={onLabelClick}>
                <span
                    className={cn(styles.item_Label, { [styles.item_Label__Required]: required })}
                >
                    {label}
                </span>
                <div className={styles.item_Field}>{children}</div>
            </LabelComponent>

            {showError && <Error error={error} />}
        </div>
    )
}

export default Item
