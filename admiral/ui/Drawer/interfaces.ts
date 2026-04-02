export interface DrawerProps {
    resetScrollPositionOnClose?: boolean
    autoFocus?: boolean
    keyboard?: boolean
    width?: number | string
    height?: number | string
    visible?: boolean
    closable?: boolean
    placement?: PlacementType
    title?: React.ReactNode
    showMask?: boolean
    maskClosable?: boolean
    getContainer?: string | HTMLElement | getContainerFunc | false
    onClose?: (e: EventType) => void
    className?: string
    style?: React.CSSProperties
    bodyWrapperStyle?: React.CSSProperties
    bodyStyle?: React.CSSProperties
    headerStyle?: React.CSSProperties
    footer?: React.ReactNode
    footerStyle?: React.CSSProperties
    afterVisibleChange?: (visible: boolean) => void
    children?: React.ReactNode
}

type PlacementType = 'top' | 'right' | 'bottom' | 'left'

type getContainerFunc = () => HTMLElement

type EventType = React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
