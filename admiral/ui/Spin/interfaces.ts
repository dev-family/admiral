export type SpinSizeType = 'small' | 'default' | 'large'
export type SpinIndicatorType = React.ReactElement<HTMLElement>

export interface SpinProps {
    className?: string
    spinning?: boolean
    style?: React.CSSProperties
    size?: SpinSizeType
    tip?: React.ReactNode
    delay?: number
    wrapperClassName?: string
}
