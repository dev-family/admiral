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

export const LoginLayout: React.FC = ({ children }) => <div className={styles.wrap}>{children}</div>

export const Login: React.FC = () => {
    const { themeName } = useTheme()
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

                <Form submitData={submit}>
                    <Form.Fields singleColumn>
                        <TextInput
                            label="Email"
                            name="email"
                            inputMode="email"
                            placeholder="Email"
                        />
                        <PasswordInput
                            label="Пароль"
                            name="password"
                            placeholder="Пароль"
                            type="password"
                        />
                    </Form.Fields>

                    <div className={styles.footer}>
                        <Form.Submit>Войти</Form.Submit>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

const LogoDefault = ({ themeName }: { themeName: ThemeName }) => {
    return (
        <Icon
            name={themeName === 'light' ? 'dev-family-logo' : 'dev-family-logo-inversion'}
            width={90}
        />
    )
}