import React, { useCallback } from 'react'
import { FiTrash } from 'react-icons/fi'
import { useDataTable } from '../DataTableContext'
import { useDataProvider } from '../../dataProvider'
import { Button, Popconfirm, Notification } from '../../ui'

import { ButtonProps } from '../../ui/Button/interfaces'
import { PopconfirmLocale } from '../../ui/Popconfirm/interfaces'
import { enUS } from '../locale'

export interface DeleteActionLocale extends PopconfirmLocale {
    title: string
}

export type DeleteActionProps = {
    resource: string
    id: string | number
    buttonProps?: ButtonProps
    locale?: DeleteActionLocale
}

export const DeleteAction: React.FC<DeleteActionProps> = ({
    resource,
    id,
    buttonProps,
    locale,
}) => {
    const { title, ...popconfirmLocale } = locale ?? enUS
    const { deleteOne } = useDataProvider()
    const { refresh } = useDataTable()

    const handleDelete = useCallback(async () => {
        try {
            await deleteOne(resource, { id })
            refresh()
        } catch (e: any) {
            Notification({
                message: e.response.data.message,
                type: 'error',
            })
        }
    }, [])

    return (
        <Popconfirm
            title={title}
            placement="left"
            onConfirm={handleDelete}
            locale={popconfirmLocale}
        >
            <Button view="clear" size="S" iconRight={<FiTrash />} {...buttonProps} />
        </Popconfirm>
    )
}
