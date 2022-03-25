import { tuple } from '../../utils/type'

const SpinSizes = tuple('small', 'default', 'large')
export type SpinSizeType = typeof SpinSizes[number]
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
