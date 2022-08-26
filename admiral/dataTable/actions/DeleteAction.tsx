import React, { useCallback } from 'react'
import { FiTrash } from 'react-icons/fi'
import { useDataTable } from '../DataTableContext'
import { useDataProvider } from '../../dataProvider'
import { Button } from '../../ui'

import { ButtonProps } from '../../ui/Button/interfaces'

export type DeleteActionProps = {
    resource: string
    id: string | number
    buttonProps?: ButtonProps
}

export const DeleteAction: React.FC<DeleteActionProps> = ({ resource, id, buttonProps }) => {
    const { deleteOne } = useDataProvider()
    const { refresh } = useDataTable()

    const handleDelete = useCallback(async () => {
        await deleteOne(resource, { id })
        refresh()
    }, [])

    return (
        <Button
            onClick={handleDelete}
            view="clear"
            size="S"
            iconRight={<FiTrash />}
            {...buttonProps}
        />
    )
}
