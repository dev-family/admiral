import React, { useEffect, useRef } from 'react'
import { defaultAuthParams, useAuthProvider } from '../AuthContext'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { OAuthProvidersEnum } from '../interfaces'

export function OAuthLoginCallback() {
    const authProvider = useAuthProvider()
    const navigate = useNavigate()
    const { provider } = useParams() as { provider: OAuthProvidersEnum }
    const data = new URLSearchParams(useLocation().search).toString()
    const calledRef = useRef(false)

    useEffect(() => {
        if (calledRef.current || !authProvider.oauthCallback) return
        calledRef.current = true

        authProvider
            .oauthCallback(provider, data)
            .then(() => navigate(defaultAuthParams.afterLoginUrl))
            .catch(() => navigate(defaultAuthParams.loginUrl))
    }, [authProvider, provider, data, navigate])

    return <></>
}
