import React, { useCallback, useEffect } from 'react'
import { defaultAuthParams, useAuthProvider } from '../AuthContext'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { OAuthProvidersEnum } from '../interfaces'

export function OAuthLoginCallback() {
    const authProvider = useAuthProvider()
    const navigate = useNavigate()
    const { provider } = useParams() as { provider: OAuthProvidersEnum }

    const data = new URLSearchParams(useLocation().search).toString()

    const oauthLogin = useCallback(
        (provider: OAuthProvidersEnum, data: string) =>
            !!authProvider.oauthCallback &&
            authProvider
                .oauthCallback(provider, data)
                .then((res: any) => {
                    const redirectUrl = defaultAuthParams.afterLoginUrl

                    navigate(redirectUrl)
                    return res
                })
                .catch(() => {
                    navigate(defaultAuthParams.loginUrl)
                    return Promise.reject()
                }),
        [authProvider, navigate, provider, data],
    )

    useEffect(() => {
        oauthLogin(provider, data)
    }, [])

    return <></>
}
