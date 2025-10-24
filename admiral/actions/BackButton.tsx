import React from 'react'
import { Button } from '../ui'
import { Link, useLocation } from 'react-router-dom'
import { ButtonProps } from '../ui/Button/interfaces'
import { RouterLocationState } from '../router/interfaces'
import { getNavigationFrom, clearNavigationFrom } from '../utils/helpers/navigationState'

export const BackButton = ({ basePath, children, ...buttonProps }: BackButtonProps) => {
    const location = useLocation<RouterLocationState>()
    const fromLocation = getNavigationFrom(location.state?.from)

    const backPath = fromLocation
        ? {
              pathname: fromLocation.pathname,
              search: fromLocation.search,
          }
        : basePath

    const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
        buttonProps.onClick?.(event)
        clearNavigationFrom()
    }

    return (
        <Link to={backPath} onClick={handleClick}>
            <Button type="button" component="span" view="secondary" {...buttonProps}>
                {children}
            </Button>
        </Link>
    )
}

interface Props {
    basePath: string
}

export type BackButtonProps = Props & ButtonProps
