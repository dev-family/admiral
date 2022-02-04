import { rest } from 'msw'
import { IUser, UserList } from './data/users'

const userList = new UserList()

export const handlers = [
    rest.get('/api/users', (req, res, ctx) => {
        const page = Number(req.url.searchParams.get('page')) || 1
        const pageSize = Number(req.url.searchParams.get('page_size')) || 10
        const sort = JSON.parse(req.url.searchParams.get('sort') || '') as Record<any, any>

        const from = page * pageSize - pageSize
        const to = page * pageSize

        return res(
            ctx.delay(1600),
            ctx.status(200),
            ctx.json({
                data: userList.getUsers(from, to, Object.entries(sort)[0]),
                pagination: { current: page, total: userList.length, page_size: pageSize },
            }),
        )
    }),
    rest.post('/api/users/create', (req, res, ctx) => {
        console.log('create user: ', req.body)
        const user = userList.add(req.body as Partial<IUser>)

        return res(ctx.delay(160), ctx.status(201), ctx.json(user))
    }),
    rest.delete('/api/users/:id', (req, res, ctx) => {
        const { id } = req.params
        userList.delete(id as string)

        return res(ctx.delay(160), ctx.status(204))
    }),
    rest.get('/api/users/:id', (req, res, ctx) => {
        const { id } = req.params
        const user = userList.getUserById(id as string)

        return res(ctx.delay(160), ctx.status(200), ctx.json(user))
    }),
    rest.post('/api/users/:id', (req, res, ctx) => {
        const { id } = req.params
        userList.update(id as string, req.body as IUser)

        return res(ctx.delay(160), ctx.status(200), ctx.json(req.body))
    }),
]
