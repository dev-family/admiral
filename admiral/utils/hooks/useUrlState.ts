import React, { useMemo, useRef } from 'react'
import { useLocation, useHistory } from 'react-router'
import { parse, stringify } from 'qs'

export interface Options {
    navigateMode?: 'push' | 'replace'
}

type UrlState = Record<string, any>

const useUrlState = <S extends UrlState = UrlState>(
    initialState?: S | (() => S),
    options?: Options,
) => {
    type State = Partial<{ [key in keyof S]: any }>
    const { navigateMode = 'push' } = options || {}

    const location = useLocation()

    const history = useHistory()

    const initialStateRef = useRef(
        typeof initialState === 'function' ? (initialState as () => S)() : initialState || {},
    )

    const queryFromUrl = useMemo(() => {
        return parse(location.search.replace(/(^[?])/gi, ''), {
            arrayLimit: 100,
        })
    }, [location.search])

    const targetQuery: State = useMemo(
        () => ({
            ...initialStateRef.current,
            ...queryFromUrl,
        }),
        [queryFromUrl],
    )

    const setState = (s: React.SetStateAction<State>) => {
        const newQuery = typeof s === 'function' ? s(targetQuery) : s

        if (history) {
            history[navigateMode]({
                hash: location.hash,
                search:
                    stringify(
                        { ...queryFromUrl, ...newQuery },
                        {
                            encode: false,
                        },
                    ) || '?',
            })
        }
    }

    return [targetQuery, setState] as const
}

export default useUrlState
