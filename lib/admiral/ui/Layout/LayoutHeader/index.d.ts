import React from 'react'
import { ThemeName } from '../../../theme/interfaces'
export declare type HeaderLogoType = string | HeaderLogoComponentType
export declare type HeaderLogoComponentType = ({
    themeName,
}: {
    themeName: ThemeName
}) => JSX.Element
declare const LayoutHeader: React.FC<{
    logo?: HeaderLogoType
}>
export default LayoutHeader
