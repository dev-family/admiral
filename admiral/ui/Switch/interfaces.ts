import type { SwitchChangeEventHandler, SwitchClickEventHandler } from 'rc-switch'

export type SwitchSizeType = 'S' | 'M' | 'L'

export interface SwitchProps
    extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange' | 'onClick'> {
    size?: SwitchSizeType
    className?: string
    prefixCls?: string
    disabled?: boolean
    loading?: boolean
    checkedChildren?: React.ReactNode
    unCheckedChildren?: React.ReactNode
    onChange?: SwitchChangeEventHandler
    onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>
    onClick?: SwitchClickEventHandler
    tabIndex?: number
    checked?: boolean
    defaultChecked?: boolean
    loadingIcon?: React.ReactNode
    style?: React.CSSProperties
    title?: string
}
