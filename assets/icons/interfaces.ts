export interface IconProps {
    fill?: string
    width?: number
    height?: number
    viewBox?: string
}

export interface IconWrapperProps extends IconProps {
    name: IconName
}

export type IconName =
    | 'backward'
    | 'backward-double'
    | 'forward'
    | 'forward-double'
    | 'dev-family-logo'
    | 'dev-family-logo-inversion'
    | 'dev-family-logo-inversion-bw'

export type IconComponentType = ((props: IconProps) => JSX.Element) | null
