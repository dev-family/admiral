import { Link, useLocation } from 'react-router-dom'
import { FiEdit3 } from 'react-icons/fi'
import { Button } from '../../ui'

import { ButtonProps } from '../../ui/Button/interfaces'
import { saveNavigationFrom } from '../../utils/helpers/navigationState'

export type EditActionProps = {
    pathname: string
    buttonProps?: ButtonProps
    behavior?: 'default' | 'backgroundRoute'
    mainRoutePath?: string
}

export function EditAction({
    buttonProps,
    pathname,
    behavior = 'default',
    mainRoutePath,
}: EditActionProps) {
    const location = useLocation()

    if (behavior === 'backgroundRoute' && !mainRoutePath) {
        console.error('Please provide "mainRoutePath" for "backgroundRoute" behavior')
    }

    const handleClick = () => {
        saveNavigationFrom(location)
    }

    return (
        <Link
            to={pathname}
            state={
                behavior === 'backgroundRoute'
                    ? {
                          background: location,
                          routeWithBackground: mainRoutePath,
                          scrollTop: false,
                      }
                    : {
                          from: location,
                      }
            }
            onClick={handleClick}
        >
            <Button view="clear" size="S" iconRight={<FiEdit3 />} {...buttonProps} />
        </Link>
    )
}
