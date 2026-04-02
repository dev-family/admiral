import React, { createContext, useContext, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
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

function RouteWrapper({ Component }: { Component: any }) {
    const params = useParams()
    return <Component {...params} />
}

function LayoutRouteWrapper({ Component }: { Component: any }) {
    const params = useParams()
    return (
        <Layout key="layout">
            <Component {...params} />
        </Layout>
    )
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const location = useLocation()
    const { authenticated, loading } = useAuthState()
    const { isDefault } = useAuthProvider()
    const authRequired = !isDefault

    if (loading && authRequired) return <div key="loading" />
    if (!authenticated && authRequired) {
        return <Navigate to="/login" state={{ nextPathname: location.pathname }} replace />
    }
    return <>{children}</>
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
                    .replace(/\[([^/]+)\]/gi, ':$1'),
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
        const location = useLocation() as ReturnType<typeof useLocation> & {
            state: RouterLocationState
        }
        const { state: locationState } = location
        const background = locationState && locationState.background
        const routeWithBackgroundName = locationState && locationState.routeWithBackground
        const routeWithBackground = routes.find((route) => route.path === routeWithBackgroundName)

        return (
            <TopLocationContextProvider value={location}>
                <RouteScrollTop />

                <Routes location={background || location}>
                    <Route
                        key={oauthRoute.path}
                        path={oauthRoute.path}
                        element={oauthRoute.Component}
                    />

                    {authRequired && (
                        <Route
                            key={loginRoutePath}
                            path={loginRoutePath}
                            element={
                                <LoginLayout key="login-layout">
                                    <LoginComponent />
                                </LoginLayout>
                            }
                        />
                    )}

                    {routes.map(({ path, Component }) =>
                        authRequired ? (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    <PrivateRoute>
                                        <LayoutRouteWrapper Component={Component} />
                                    </PrivateRoute>
                                }
                            />
                        ) : (
                            <Route
                                key={path}
                                path={path}
                                element={<LayoutRouteWrapper Component={Component} />}
                            />
                        ),
                    )}

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>

                {background && routeWithBackground && (
                    <Routes>
                        <Route
                            key="routeWithBackground"
                            path={routeWithBackground.path}
                            element={<RouteWrapper Component={routeWithBackground.Component} />}
                        />
                    </Routes>
                )}
            </TopLocationContextProvider>
        )
    }
}

function RouteScrollTop() {
    const { pathname, state } = useLocation() as ReturnType<typeof useLocation> & {
        state: RouterLocationState
    }
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

export const TopLocationContext = createContext<TopLocationContextValue>(
    null as unknown as TopLocationContextValue,
)

export function TopLocationContextProvider({
    value,
    children,
}: {
    value: TopLocationContextValue
    children?: React.ReactNode
}) {
    return <TopLocationContext.Provider value={value}>{children}</TopLocationContext.Provider>
}

export function useTopLocation() {
    return useContext(TopLocationContext)
}
