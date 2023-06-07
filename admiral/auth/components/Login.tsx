import React, { useEffect, useCallback } from 'react'
import useCheckAuth from '../useCheckAuth'
import useLogin from '../useLogin'
import { useHistory } from 'react-router-dom'
import { Card } from '../../ui'
import { Form, TextInput, PasswordInput } from '../../form'
import styles from './Login.module.scss'
import { useConfig } from '../../config/ConfigContext'
import { useTheme } from '../../theme'
import { ThemeName } from '../../theme/interfaces'
import Icon from '../../assets/icons'
import { useLocaleProvider } from '../../crud/locale/LocaleContext'
import OAuthLoginComponent from './OAuthLogin'
import { formLocale } from '../../form'

export const LoginLayout: React.FC = ({ children }) => <div className={styles.wrap}>{children}</div>

export const Login: React.FC = () => {
    const { themeName } = useTheme()
    const { layout: locale } = useLocaleProvider()
    const checkAuth = useCheckAuth()
    const history = useHistory()
    const { loginLogo = LogoDefault } = useConfig()
    const LogoComponent = typeof loginLogo === 'function' ? loginLogo : null

    useEffect(() => {
        checkAuth({}, false)
            .then(() => {
                history.push('/')
            })
            .catch(() => {})
    }, [checkAuth, history])

    const login = useLogin()

    const submit = useCallback(
        (values: any) => {
            return login(values)
        },
        [login],
    )

    return (
        <div className={styles.content}>
            <Card className={styles.card} verticalSpace="xl" horizontalSpace="xl">
                <div className={styles.logo}>
                    {LogoComponent ? (
                        <LogoComponent themeName={themeName} />
                    ) : (
                        <img src={loginLogo as string} alt="logo" />
                    )}
                </div>

                <Form
                    submitData={submit}
                    locale={{
                        ...formLocale.enUS,
                        successMessage: 'You are successfully logged in',
                    }}
                >
                    <Form.Fields singleColumn>
                        <TextInput
                            autoComplete="on"
                            label={locale.email}
                            name="email"
                            inputMode="email"
                            placeholder={locale.email}
                        />
                        <PasswordInput
                            autoComplete="on"
                            label={locale.password}
                            name="password"
                            placeholder={locale.password}
                            type="password"
                        />
                    </Form.Fields>

                    <div className={styles.footer}>
                        <Form.Submit>{locale.login}</Form.Submit>
                    </div>
                </Form>
                <OAuthLoginComponent />
            </Card>
        </div>
    )
}

const LogoDefault = ({ themeName }: { themeName: ThemeName }) => {
    return <Icon name={themeName === 'light' ? 'logo-auth' : 'logo-auth-inversion'} width={140} />
}
