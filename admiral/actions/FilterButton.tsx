import React, { useCallback } from 'react'
import { Button } from '../ui'
import { FiFilter } from 'react-icons/fi'
import { useCrudIndex } from '../crud/CrudIndexPageContext'
import type { ButtonProps } from '../ui/Button/interfaces'

export const FilterButton = ({ children }: FilterButtonProps) => {
    const { setFilterDrawer } = useCrudIndex()

    const showDrawer = useCallback(() => {
        setFilterDrawer(true)
    }, [])

    return (
        <Button type="button" iconLeft={<FiFilter />} onClick={showDrawer}>
            {children}
        </Button>
    )
}

export type FilterButtonProps = ButtonProps
