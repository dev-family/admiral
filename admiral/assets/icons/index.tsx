import React from 'react'
import { IconComponentType, IconWrapperProps } from './interfaces'
import Logo from './Logo'
import LogoInversion from './LogoInversion'
import LogoWithSquare from './LogoWithSquare'
import LogoWithSquareInversion from './LogoWithSquareInversion'
import DevFamilyLogoInversionBW from './DevFamilyLogoInversionBW'
import Spinner from './SpinnerIcon'

const Icon = ({ name, ...props }: IconWrapperProps) => {
    let Component: IconComponentType
    Component = Logo

    switch (name) {
        case 'dev-family-logo': {
            Component = Logo
            break
        }
        case 'dev-family-logo-inversion': {
            Component = LogoInversion
            break
        }
        case 'logo-auth': {
            Component = LogoWithSquare
            break
        }
        case 'logo-auth-inversion': {
            Component = LogoWithSquareInversion
            break
        }
        case 'dev-family-logo-inversion-bw': {
            Component = DevFamilyLogoInversionBW
            break
        }
        case 'spinner': {
            Component = Spinner
            break
        }
    }

    return <Component {...props} />
}

export default Icon
