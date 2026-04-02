import { Button } from '../ui'
import { ButtonProps } from '../ui/Button/interfaces'
import { FiPlus } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { saveNavigationFrom } from '../utils/helpers/navigationState'

export const CreateButton = ({ basePath, children }: CreateButtonProps) => {
    const location = useLocation()

    const handleClick = () => {
        saveNavigationFrom(location)
    }

    return (
        <Link
            to={`${basePath}/create`}
            state={{
                from: location,
            }}
            onClick={handleClick}
        >
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
