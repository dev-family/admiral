import { Button } from '../ui'
import { ButtonProps } from '../ui/Button/interfaces'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import React from 'react'

export const CreateButton = ({ basePath, children }: CreateButtonProps) => {
    return (
        <Link to={`${basePath}/create`}>
            <Button component="span" iconLeft={<FiPlus />}>
                {children}
            </Button>
        </Link>
    )
}

interface Props {
    basePath?: string
}

export type CreateButtonProps = Props & ButtonProps
