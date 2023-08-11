export interface DialogProps {
    visible: boolean
    title?: React.ReactNode
    onClose?: () => void
    children?: React.ReactNode
}
