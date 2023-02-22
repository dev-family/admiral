import React, { useCallback, useEffect } from 'react'
import { defaultAuthParams, useAuthProvider } from '../AuthContext'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { OAuthProvidersEnum } from '../interfaces'
import { RouterLocationState } from '../../router/interfaces'

export const OAuthLoginCallback: React.FC = () => {
    const authProvider = useAuthProvider()
    const history = useHistory<RouterLocationState>()
    const match = useRouteMatch<{ provider: OAuthProvidersEnum }>()

    const provider = match.params.provider
    const data = new URLSearchParams(useLocation().search).toString()

    const oauthLogin = useCallback(
        (provider, data) =>
            !!authProvider.oauthCallback &&
            authProvider
                .oauthCallback(provider, data)
                .then((res: any) => {
                    const redirectUrl = defaultAuthParams.afterLoginUrl

                    history.push(redirectUrl)
                    return res
                })
                .catch(() => {
                    history.push(defaultAuthParams.loginUrl)
                    return Promise.reject()
                }),
        [authProvider, history, provider, data],
    )

    useEffect(() => {
        oauthLogin(provider, data)
    })

    return <></>
}
