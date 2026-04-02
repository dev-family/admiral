import React from 'react';
import { ThemeName } from '../../../theme/interfaces';
export type LogoType = string | LogoComponentType;
export type LogoComponentType = ({ themeName }: {
    themeName: ThemeName;
}) => React.JSX.Element;
declare function LayoutHeader({ logo }: {
    logo?: LogoType;
}): import("react/jsx-runtime").JSX.Element;
export default LayoutHeader;
