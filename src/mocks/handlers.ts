import { rest } from 'msw'
import { IUser, UserList } from './data/users'
import { ITheme, Theme } from './data/theme'
import zipObjectDeep from 'lodash.zipobjectdeep'
import qs from 'qs'
import { UploadFile, OptionType } from '../../admiral'

const userList = new UserList()
const theme = new Theme()

export const handlers = [
    // users
    rest.get('/api/users', (req, res, ctx) => {
        const page = Number(req.url.searchParams.get('page')) || 1
        const pageSize = Number(req.url.searchParams.get('perPage')) || 10
        const sort = JSON.parse(req.url.searchParams.get('sort') || '{}') as Record<any, any>
        const filter = (qs.parse(req.url.searchParams.toString()).filter || {}) as Record<any, any>

        const from = page * pageSize - pageSize
        const to = page * pageSize

        const [items, all] = userList.getUsers(from, to, Object.entries(sort)[0], filter)

        return res(
            ctx.delay(1600),
            ctx.status(200),
            ctx.json({
                items,
                meta: { current: page, total: all.length, page_size: pageSize },
            }),
        )
    }),
    rest.post('/api/users/reorder', (req, res, ctx) => {
        const data: Record<'replaces', [string, string]> = toObj(req.body as any)
        const users = userList.reorder(...data.replaces)

        return res(ctx.delay(160), ctx.status(200), ctx.json({ data: users }))
    }),
    rest.post('/api/users', (req, res, ctx) => {
        const data = toObj(req.body as any)
        const user = userList.add(data as Partial<IUser>)

        return res(ctx.delay(160), ctx.status(201), ctx.json({ data: user }))
    }),
    rest.delete('/api/users/:id', (req, res, ctx) => {
        const { id } = req.params
        userList.delete(id as string)

        return res(ctx.delay(160), ctx.status(204))
    }),
    rest.get('/api/users/create', (req, res, ctx) => {
        const options = userList.getOptions()

        return res(ctx.delay(160), ctx.status(200), ctx.json({ data: {}, values: options }))
    }),
    rest.get('/api/users/filters', (req, res, ctx) => {
        const urlState = qs.parse(req.url.searchParams.toString())
        const options = userList.getOptions(urlState as any)

        return res(ctx.delay(160), ctx.status(200), ctx.json({ options }))
    }),
    rest.get('/api/users/:id/update', (req, res, ctx) => {
        const { id } = req.params
        const user = userList.getUserById(id as string)
        const options = userList.getOptions()

        return res(ctx.delay(160), ctx.status(200), ctx.json({ data: user, values: options }))
    }),
    rest.post('/api/users/:id', (req, res, ctx) => {
        const { id } = req.params
        const data = toObj(req.body as any)
        userList.update(id as string, data as IUser)

        return res(ctx.delay(160), ctx.status(200), ctx.json({ data }))
    }),
    rest.get('/api/users/ajax-select/:field', (req, res, ctx) => {
        const { field } = req.params
        const query = req.url.searchParams.get('query')
        let options: OptionType[] = !query
            ? []
            : userList.searchOptions(field as keyof IUser, query)

        return res(ctx.delay(160), ctx.status(200), ctx.json(options))
    }),
    // themes
    rest.get('/api/theme', (req, res, ctx) => {
        return res(ctx.delay(1600), ctx.status(200), ctx.json({ data: theme.data, values: {} }))
    }),
    rest.post('/api/theme/update', (req, res, ctx) => {
        const data = toObj(req.body as any)
        theme.update(data as ITheme)

        return res(ctx.delay(160), ctx.status(200), ctx.json({ data }))
    }),
    // auth
    rest.post('/api/login', (req, res, ctx) => {
        const data = req.body as { user: string; password: string }

        return res(
            ctx.delay(160),
            ctx.status(201),
            ctx.json({ data: { user: data.user, token: `${Math.random()}` } }),
        )
    }),
    rest.post('/api/logout', (req, res, ctx) => {
        return res(ctx.delay(160), ctx.status(200))
    }),
    rest.get('/api/checkAuth', (req, res, ctx) => {
        return res(ctx.delay(100), ctx.status(201))
    }),
    rest.get('/api/getIdentity', (req, res, ctx) => {
        return res(
            ctx.delay(100),
            ctx.status(201),
            ctx.json({
                id: '1',
                fullName: 'Dev Family',
                email: 'dev.family@websecret.by',
                avatar: 'https://picsum.photos/200',
            }),
        )
    }),
    rest.get('/api/auth/social-login/:provider', (req, res, ctx) => {
        const { provider } = req.params

        return res(
            ctx.delay(160),
            ctx.status(201),
            ctx.json({
                redirect: `/oauth/${provider}`,
            }),
        )
    }),
    rest.post('/api/auth/social-login/:provider/callback', (req, res, ctx) => {
        const data = req.body as { user: string; password: string }

        return res(
            ctx.delay(160),
            ctx.status(201),
            ctx.json({ data: { user: data.user, token: `${Math.random()}` } }),
        )
    }),
    rest.post('/api/editorUpload', (req, res, ctx) => {
        return res(
            ctx.delay(160),
            ctx.status(200),
            ctx.json({ location: 'https://picsum.photos/500' }),
        )
    }),
]

function toObj(data: Record<string, any>): Record<any, any> {
    const entries = Object.entries(data).reduce<any[][]>(
        (acc, [k, v]) => {
            acc[0].push(k)
            if ((v as UploadFile) instanceof File) {
                acc[1].push({
                    lastModified: v.lastModified,
                    name: v.name,
                    size: v.size,
                    type: v.type,
                    uid: v.uid,
                    url: 'https://picsum.photos/200',
                })
            } else {
                acc[1].push(v)
            }

            return acc
        },
        [[], []],
    )
    return zipObjectDeep(entries[0], entries[1])
}
