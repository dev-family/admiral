/// <reference types="react" />
export interface IconProps {
    fill?: string;
    width?: number;
    height?: number;
    viewBox?: string;
}
export interface IconWrapperProps extends IconProps {
    name: IconName;
}
export declare type IconName = 'dev-family-logo' | 'dev-family-logo-inversion' | 'dev-family-logo-inversion-bw' | 'logo-auth' | 'logo-auth-inversion' | 'spinner';
export declare type IconComponentType = ((props: IconProps) => JSX.Element) | null;
