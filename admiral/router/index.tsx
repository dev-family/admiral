import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import React from 'react'

export function createRoutesFrom(modules: any) {
    const routes = Object.keys(modules)
        .map((path: string) => {
            const name = path.match(/\.\/pages\/(.*)\.tsx$/)![1]

            return {
                name,
                path: '/' + name.replace('index', '/').replace('//', ''),
                Component: modules[path].default,
            }
        })
        .reverse()

    console.log(routes)

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
