import React, { useMemo, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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

    const navigate = useNavigate()

    const initialStateRef = useRef(
        typeof initialState === 'function' ? (initialState as () => S)() : initialState || {},
    )

    const queryFromUrl = useMemo(() => {
        return parse(location.search.replace(/(^[?])/gi, ''), {
            arrayLimit: 100,
            decoder,
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

        navigate(
            {
                hash: location.hash,
                search:
                    stringify(
                        { ...queryFromUrl, ...newQuery },
                        {
                            encoder,
                        },
                    ) || '?',
            },
            { replace: navigateMode === 'replace' },
        )
    }

    return [targetQuery, setState] as const
}

function encoder(
    str: string,
    _defaultEncoder: (str: string) => string,
    _charset: string,
    type: 'key' | 'value',
) {
    if (type === 'value') {
        // Escape only the characters that corrupt query-string structure
        // (`%` first, then qs/URL delimiters); everything else stays raw for
        // URL readability (cyrillic, spaces, commas).
        return String(str)
            .replace(/%/g, '%25')
            .replace(/&/g, '%26')
            .replace(/\+/g, '%2B')
            .replace(/=/g, '%3D')
            .replace(/#/g, '%23')
            .replace(/\?/g, '%3F')
    }
    // Keys: leave as-is for readability (e.g. filter[name])
    return String(str)
}

function decoder(str: string) {
    const keywords: Record<string, any> = {
        true: true,
        false: false,
        null: null,
        undefined,
    }
    if (str in keywords) {
        return keywords[str]
    }

    try {
        // `+` is a space in the query-string convention (externally crafted/bookmarked
        // URLs); our own encoder writes literal plus signs as %2B
        return decodeURIComponent(str.replace(/\+/g, ' '))
    } catch {
        return str
    }
}

export default useUrlState
