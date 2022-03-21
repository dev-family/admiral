import { TextareaAutosizeProps } from 'react-textarea-autosize'

export type TextareaSize = 'XS' | 'S' | 'M' | 'L'

export interface TextareaProps extends TextareaAutosizeProps {
    size?: TextareaSize
    borderless?: boolean
    alert?: boolean
}
