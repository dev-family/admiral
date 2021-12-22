import React from 'react'
import { Switch, Route } from 'react-router-dom'

export function createRoutesFrom(modules: any) {
    const routes = Object.keys(modules)
        .map((path: string) => {
            const name = path.match(/\.\/pages\/(.*)\.tsx$/)![1]

            return {
                name,
                path:
                    '/' +
                    name
                        .replace('index', '/')
                        .replace('//', '')
                        // replaces [param] with :param
                        .replace(/\[([^\/]+)\]/gi, ':$1'),
                Component: modules[path].default,
            }
        })
        .reverse()

    return () => (
        <Switch>
            {routes.map(({ path, Component }) => (
                <Route
                    key={path}
                    path={path}
                    exact
                    render={({ match }) => <Component {...match.params} />}
                />
            ))}
        </Switch>
    )
}
