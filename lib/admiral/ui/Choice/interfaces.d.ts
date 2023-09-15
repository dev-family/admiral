/// <reference types="react" />
export interface ChoiceChangeEventTarget extends ChoiceProps {
    checked: boolean;
}
export interface ChoiceChangeEvent {
    target: ChoiceChangeEventTarget;
    event: Event;
}
export declare type ChoiceView = 'primary' | 'ghost';
export interface ChoiceProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    classNames?: {
        wrapper?: string;
        input?: string;
        inner?: string;
    };
    view?: ChoiceView;
    indeterminate?: boolean;
    onChange?: (e: ChoiceChangeEvent) => void;
}
