import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiEdit3 } from 'react-icons/fi'
import { Button } from '../../ui'

import { ButtonProps } from '../../ui/Button/interfaces'
import { RouterLocationState } from '../../router/interfaces'

export type EditActionProps = {
    pathname: string
    buttonProps?: ButtonProps
    behavior?: 'default' | 'backgroundRoute'
    mainRoutePath?: string
}

export const EditAction: React.FC<EditActionProps> = ({
    buttonProps,
    pathname,
    behavior,
    mainRoutePath,
}) => {
    let location = useLocation<RouterLocationState>()

    if (behavior === 'backgroundRoute' && !mainRoutePath) {
        console.error('Please provide "mainRoutePath" for "backgroundRoute" behavior')
    }

    return (
        <Link
            to={{
                pathname,
                ...(behavior === 'backgroundRoute' && {
                    state: {
                        background: location,
                        routeWithBackground: mainRoutePath,
                        scrollTop: false,
                    },
                }),
            }}
        >
            <Button view="clear" size="S" iconRight={<FiEdit3 />} {...buttonProps} />
        </Link>
    )
}

EditAction.defaultProps = {
    behavior: 'default',
}
