import React, { useCallback } from 'react'
import { FaGithub, FaGoogle, FaJira } from 'react-icons/fa'
import { useAuthProvider } from '../AuthContext'
import { useConfig } from '../../config/ConfigContext'
import { useLocaleProvider } from '../../locale'
import { Button } from '../../ui'
import { OAuthProvidersEnum } from '../interfaces'
import styles from './Login.module.scss'

const OAuthLoginComponent = () => {
    const authProvider = useAuthProvider()
    const oauthProviders = useConfig().oauthProviders
    const { auth: locale } = useLocaleProvider()

    const OAuthProvidersIcons: Record<OAuthProvidersEnum, JSX.Element> = {
        [OAuthProvidersEnum.Google]: <FaGoogle />,
        [OAuthProvidersEnum.Github]: <FaGithub />,
        [OAuthProvidersEnum.Jira]: <FaJira />,
    }

    const iconForProvider = (provider: OAuthProvidersEnum) => {
        return OAuthProvidersIcons[provider]
    }

    if (!oauthProviders || oauthProviders.length === 0) {
        return <></>
    }

    const handleOAuthLogin = useCallback(
        (provider) => {
            if (!authProvider?.oauthLogin) {
                return
            }

            authProvider?.oauthLogin(provider).then((response) => {
                window.location.href = response.redirect
            })
        },
        [authProvider],
    )

    return (
        <div className={styles.socialLogin}>
            <div className={styles.socialLoginTitle}>{locale.oauth}</div>
            <div className={styles.socialLoginButtons}>
                {oauthProviders?.map((provider) => {
                    return (
                        <Button
                            key={provider}
                            onClick={() => handleOAuthLogin(provider)}
                            className={styles.socialLoginButton}
                            iconLeft={iconForProvider(provider)}
                        >
                            {provider}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}

export default OAuthLoginComponent
