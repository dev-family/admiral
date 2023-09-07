import React, { createContext, useContext, useEffect } from 'react'
import { Redirect, Route, RouteProps, Switch, useLocation } from 'react-router-dom'
import { useAuthProvider } from '../auth/AuthContext'
import { useAuthState } from '../auth'
import { Login, LoginLayout } from '../auth/components/Login'
import { Layout } from '../ui'
import { Location, RouterLocationState } from './interfaces'
import { OAuthLoginCallback } from '../auth/components/OAuthLoginCallback'

type RouteType = {
    name: string
    path: string
    Component: any
}
interface CreateRoutesConfig {
    withAuth?: boolean
}
export function createRoutesFrom(modules: any, config?: CreateRoutesConfig) {
    const authRequired = config?.withAuth ?? true
    const loginRoute: RouteType = {
        name: 'login',
        path: '/login',
        Component: Login,
    }

    const oauthRoute: RouteType = {
        name: 'oauth',
        path: '/oauth/:provider',
        Component: <OAuthLoginCallback />,
    }

    const routes = Object.keys(modules)
        .reduce<RouteType[]>((acc, path: string) => {
            const name = path.match(/\.\/pages\/(.*)\.tsx$/)![1]
            if (name === 'login') {
                loginRoute.Component = modules[path].default
                return acc
            }

            acc.push({
                name,
                path: `/${name}`
                    .replace('index', '/')
                    .replace('//', '/')
                    // replaces [param] with :param
                    .replace(/\[([^\/]+)\]/gi, ':$1'),
                Component: modules[path].default,
            })
            return acc
        }, [])
        .reverse()
        // fix os specific routes sort
        .sort((a, b) => {
            const nameA = a.name.toUpperCase()
            const nameB = b.name.toUpperCase()
            if (nameA < nameB) return -1
            if (nameA > nameB) return 1
            return 0
        })

    const { path: loginRoutePath, Component: LoginComponent } = loginRoute

    return () => {
        const location = useLocation<RouterLocationState>()
        const { state: locationState } = location
        const background = locationState && locationState.background
        const routeWithBackgroundName = locationState && locationState.routeWithBackground
        const routeWithBackground = routes.find((route) => route.path === routeWithBackgroundName)

        return (
            <TopLocationContextProvider value={location}>
                <RouteScrollTop />

                <Switch location={background || location}>
                    <Route
                        key={oauthRoute.path}
                        path={oauthRoute.path}
                        exact
                        render={({ match }) => oauthRoute.Component}
                    />

                    {authRequired && (
                        <Route
                            key={loginRoutePath}
                            path={loginRoutePath}
                            exact
                            render={({ match }) => (
                                <LoginLayout key="login-layout">
                                    <LoginComponent {...match.params} />
                                </LoginLayout>
                            )}
                        />
                    )}

                    {routes.map(({ path, Component }) =>
                        authRequired ? (
                            <PrivateRoute
                                key={path}
                                path={path}
                                exact
                                render={({ match }) => (
                                    <Layout key="layout">
                                        <Component {...match.params} />
                                    </Layout>
                                )}
                            />
                        ) : (
                            <Route
                                key={path}
                                path={path}
                                exact
                                render={({ match }) => (
                                    <Layout key="layout">
                                        <Component {...match.params} />
                                    </Layout>
                                )}
                            />
                        ),
                    )}
                </Switch>

                {background && routeWithBackground && (
                    <Route
                        key="routeWithBackground"
                        path={routeWithBackground.path}
                        exact
                        render={({ match }) => (
                            <routeWithBackground.Component key="background" {...match.params} />
                        )}
                    />
                )}

                <Redirect to="/" />
            </TopLocationContextProvider>
        )
    }
}

function PrivateRoute({ children, render, ...rest }: RouteProps) {
    const { authenticated, loading } = useAuthState()
    const { isDefault } = useAuthProvider()
    const authRequired = !isDefault

    return (
        <Route
            {...rest}
            render={({ location, ...props }) =>
                authenticated || !authRequired ? (
                    render?.({ location, ...props }) ?? children
                ) : loading && authRequired ? (
                    <div key="loading" />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { nextPathname: location.pathname },
                        }}
                    />
                )
            }
        />
    )
}

function RouteScrollTop() {
    const { pathname, state } = useLocation<RouterLocationState>()
    const shouldScroll = (state && state.scrollTop) ?? true

    useEffect(() => {
        if (shouldScroll) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            })
        }
    }, [pathname])

    return null
}

type TopLocationContextValue = Location<RouterLocationState>

export const TopLocationContext = createContext<TopLocationContextValue>({} as any)

export const TopLocationContextProvider: React.FC<{ value: TopLocationContextValue }> = ({
    value,
    children,
}) => {
    return <TopLocationContext.Provider value={value}>{children}</TopLocationContext.Provider>
}

export function useTopLocation() {
    return useContext(TopLocationContext)
}
