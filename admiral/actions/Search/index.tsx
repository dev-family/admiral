import React from 'react'
import debounce from 'lodash.debounce'
import { ChangeEvent } from 'react'
import styles from './Search.module.scss'
import { useCrudIndex } from '../../crud/CrudIndexPageContext'

export const Search = () => {
    const { urlState, setUrlState } = useCrudIndex()

    const search = (value: string) => {
        setUrlState({
            ...urlState,
            page: undefined,
            search: value,
        })
    }

    const debouncedSearch = debounce(search, 500)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => debouncedSearch(e.target.value)

    return (
        <div className={styles.search__wrapper}>
            <input
                type="search"
                className={styles.search}
                onChange={handleChange}
                placeholder="Search..."
                defaultValue={urlState.search || ''}
            />
        </div>
    )
}
