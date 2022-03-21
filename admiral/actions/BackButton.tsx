import React, { useCallback } from 'react'
import { Button } from '@/admiral/ui'
import { Link, useHistory } from 'react-router-dom'
import { ButtonProps } from '@/admiral/ui/Button/interfaces'

export const BackButton = ({ basePath, children, ...buttonProps }: BackButtonProps) => {
    const { length: historyLength, goBack } = useHistory()
    const canGoBack = historyLength > 2

    const handleGoBack = useCallback(
        (event: React.MouseEvent<Element, MouseEvent>) => {
            buttonProps.onClick?.(event)
            goBack()
        },
        [buttonProps.onClick, goBack],
    )

    return canGoBack ? (
        <Button type="button" view="secondary" {...buttonProps} onClick={handleGoBack}>
            {children}
        </Button>
    ) : (
        <Link to={basePath}>
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