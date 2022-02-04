import React from 'react'
import { Switch, Route } from 'react-router-dom'

export function createRoutesFrom(modules: any) {
    const routes = Object.keys(modules)
        .map((path: string) => {
            const name = path.match(/\.\/pages\/(.*)\.tsx$/)![1]

            return {
                name,
                path: `/${name}`
                    .replace('index', '/')
                    .replace('//', '/')
                    // replaces [param] with :param
                    .replace(/\[([^\/]+)\]/gi, ':$1'),
                Component: modules[path].default,
            }
        })
        .reverse()
        // fix os specific routes sort
        .sort((a, b) => {
            const nameA = a.name.toUpperCase()
            const nameB = b.name.toUpperCase()
            if (nameA < nameB) return -1
            if (nameA > nameB) return 1
            return 0
        })

    console.log('routes: ', routes)

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
