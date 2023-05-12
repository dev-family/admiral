import React, { useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import debounce from 'lodash.debounce'
import { VscChromeClose } from 'react-icons/vsc'
import { Input } from '../../ui'
import { ChangeEvent } from 'react'
import styles from './SearchField.module.scss'
import { useCrudIndex } from '../../crud/CrudIndexPageContext'

interface Props {
    className?: string
}

export const SearchField = ({ className }: Props) => {
    const { urlState, setUrlState } = useCrudIndex()
    const [value, setValue] = useState(urlState.search)

    const search = (value?: string) => {
        setUrlState({
            ...urlState,
            page: undefined,
            search: value,
        })
    }

    const debouncedSearch = useCallback(debounce(search, 500), [urlState])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value)
        setValue(e.target.value)
    }

    const clearValue = () => {
        setValue('')
        search(undefined)
    }

    useEffect(() => {
        setValue(urlState.search)
    }, [urlState.search])

    return (
        <div className={styles.search__wrapper}>
            <Input
                value={value}
                onChange={handleChange}
                type="search"
                placeholder="Search..."
                className={cn(styles.search, className)}
            />
            <div
                className={cn(styles.search__clear, { [styles['search__clear--visible']]: value })}
            >
                <VscChromeClose onClick={clearValue} />
            </div>
        </div>
    )
}
