import { TooltipProps } from '../Tooltip/interfaces'

export interface PopconfirmProps extends Pick<TooltipProps, 'placement'> {
    title: React.ReactNode
    initialOpen?: boolean
    onConfirm?: (e?: React.MouseEvent<Element>) => void
    onCancel?: (e?: React.MouseEvent<Element>) => void
    locale?: PopconfirmLocale
    children?: React.ReactElement<any>
}

export interface PopconfirmLocale {
    cancelTitle: string
    confirmTitle: string
}
