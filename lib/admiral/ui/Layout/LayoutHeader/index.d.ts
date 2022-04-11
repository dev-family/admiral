import React from 'react'
import { ThemeName } from '../../../theme/interfaces'
export declare type LogoType = string | LogoComponentType
export declare type LogoComponentType = ({ themeName }: { themeName: ThemeName }) => JSX.Element
declare const LayoutHeader: React.FC<{
    logo?: LogoType
}>
export default LayoutHeader
