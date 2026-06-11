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

export function DeleteAction({ resource, id, buttonProps, locale }: DeleteActionProps) {
    const { title, ...popconfirmLocale } = locale ?? enUS
    const { deleteOne } = useDataProvider()
    const { refresh } = useDataTable()

    const handleDelete = useCallback(async () => {
        try {
            await deleteOne(resource, { id })
            refresh()
        } catch (e) {
            const message = (e as { response?: { data?: { message?: string } } })?.response?.data
                ?.message
            Notification({
                message: message ?? (e instanceof Error ? e.message : String(e)),
                type: 'error',
            })
        }
    }, [deleteOne, resource, id, refresh])

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
