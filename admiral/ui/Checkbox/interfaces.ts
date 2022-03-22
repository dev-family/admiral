import { ChoiceChangeEvent } from '../Choice/interfaces'

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
