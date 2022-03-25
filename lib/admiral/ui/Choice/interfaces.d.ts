/// <reference types="react" />
export interface ChoiceChangeEventTarget extends ChoiceProps {
    checked: boolean
}
export interface ChoiceChangeEvent {
    target: ChoiceChangeEventTarget
    event: Event
}
export interface ChoiceProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    classNames?: {
        wrapper?: string
        input?: string
        inner?: string
    }
    view?: 'primary' | 'ghost'
    indeterminate?: boolean
    onChange?: (e: ChoiceChangeEvent) => void
}
