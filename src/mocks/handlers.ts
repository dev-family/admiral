import { http, HttpResponse, delay } from 'msw'
import { IUser, UserList } from './data/users'
import { ITheme, Theme } from './data/theme'
import qs from 'qs'
import { UploadFile, OptionType } from '../../admiral'

const userList = new UserList()
const theme = new Theme()

export const handlers = [
    // users
    http.get('/api/users', async ({ request }) => {
        const url = new URL(request.url)
        const page = Number(url.searchParams.get('page')) || 1
        const pageSize = Number(url.searchParams.get('perPage')) || 10
        const sort = JSON.parse(url.searchParams.get('sort') || '{}') as Record<any, any>
        const filter = (qs.parse(url.searchParams.toString()).filter || {}) as Record<any, any>

        const from = page * pageSize - pageSize
        const to = page * pageSize

        const [items, all] = userList.getUsers(from, to, Object.entries(sort)[0], filter)

        await delay(1600)
        return HttpResponse.json({
            items,
            meta: { current: page, total: all.length, page_size: pageSize },
        })
    }),
    http.post('/api/users/reorder', async ({ request }) => {
        const body = formDataToObj(await request.formData())
        const data: Record<'replaces', [string, string]> = toObj(body)
        const users = userList.reorder(...data.replaces)

        await delay(160)
        return HttpResponse.json({ data: users })
    }),
    http.post('/api/users', async ({ request }) => {
        const body = formDataToObj(await request.formData())
        const data = toObj(body)
        const user = userList.add(data as Partial<IUser>)

        await delay(160)
        return HttpResponse.json({ data: user }, { status: 201 })
    }),
    http.delete('/api/users/:id', async ({ params }) => {
        const { id } = params
        userList.delete(id as string)

        await delay(160)
        return new HttpResponse(null, { status: 204 })
    }),
    http.get('/api/users/create', async () => {
        const options = userList.getOptions()

        await delay(160)
        return HttpResponse.json({ data: {}, values: options })
    }),
    http.get('/api/users/filters', async ({ request }) => {
        const url = new URL(request.url)
        const urlState = qs.parse(url.searchParams.toString())
        const options = userList.getOptions(urlState as any)

        await delay(160)
        return HttpResponse.json({ options })
    }),
    http.get('/api/users/:id/update', async ({ params }) => {
        const { id } = params
        const user = userList.getUserById(id as string)
        const options = userList.getOptions()

        await delay(160)
        return HttpResponse.json({ data: user, values: options })
    }),
    http.post('/api/users/:id', async ({ params, request }) => {
        const { id } = params
        const body = formDataToObj(await request.formData())
        const data = toObj(body)

        // Laravel-style 422 so the demo forms can show server validation.
        // Only keys present in the payload are checked — the demo resources
        // sharing this endpoint submit different field sets.
        const errors: Record<string, string[]> = {}
        for (const field of ['name', 'email', 'password']) {
            if (field in data && !data[field]) {
                errors[field] = [`The ${field} field is required.`]
            }
        }
        // Conditional-fields demo: when the client is a person, the legal-only
        // `inn` field is hidden, so its value is stripped from the payload. The
        // server still complains about it — the form moves that error into
        // `_global` and logs a console.warn instead of pinning it to the hidden
        // field (R12). Keyed off `type` so this only fires for the demo that
        // sends it, not the plain Users CRUD.
        if (data.type === 'person') {
            errors.inn = ['The inn field is required.']
        }
        if (Object.keys(errors).length) {
            await delay(160)
            return HttpResponse.json({ errors, message: 'Validation failed' }, { status: 422 })
        }

        userList.update(id as string, data as IUser)

        await delay(160)
        return HttpResponse.json({ data })
    }),
    http.get('/api/users/ajax-select/:field', async ({ params, request }) => {
        const { field } = params
        const url = new URL(request.url)
        const query = url.searchParams.get('query')
        // The cascade child (`city`) sends its parent value as `country` (R6) so
        // the backend returns cities of the selected country. `country` itself
        // and `city` return their list eagerly (no search keystroke required).
        const country = url.searchParams.get('country') ?? undefined
        const isCascade = field === 'country' || field === 'city'
        const options: OptionType[] =
            !query && !isCascade
                ? []
                : userList.searchOptions(field as string, query ?? '', country)

        await delay(160)
        return HttpResponse.json(options)
    }),
    // themes
    http.get('/api/theme', async () => {
        await delay(1600)
        return HttpResponse.json({ data: theme.data, values: {} })
    }),
    http.post('/api/theme/update', async ({ request }) => {
        const body = formDataToObj(await request.formData())
        const data = toObj(body)
        theme.update(data as ITheme)

        await delay(160)
        return HttpResponse.json({ data })
    }),
    // auth
    http.post('/api/login', async ({ request }) => {
        const data = (await request.json()) as { user: string; password: string }

        await delay(160)
        return HttpResponse.json(
            { data: { user: data.user, token: `${Math.random()}` } },
            { status: 201 },
        )
    }),
    http.post('/api/logout', async () => {
        await delay(160)
        return new HttpResponse(null, { status: 200 })
    }),
    http.get('/api/checkAuth', async () => {
        await delay(100)
        return HttpResponse.json(null, { status: 201 })
    }),
    http.get('/api/getIdentity', async () => {
        await delay(100)
        return HttpResponse.json(
            {
                id: '1',
                fullName: 'Dev Family',
                email: 'admiral@dev.family',
                avatar: 'https://loremflickr.com/200/200',
            },
            { status: 201 },
        )
    }),
    http.get('/api/auth/social-login/:provider', async ({ params }) => {
        const { provider } = params

        await delay(160)
        return HttpResponse.json(
            {
                redirect: `oauth/${provider}`,
            },
            { status: 201 },
        )
    }),
    http.post('/api/auth/social-login/:provider/callback', async ({ request }) => {
        const data = (await request.json()) as { user: string; password: string }

        await delay(160)
        return HttpResponse.json(
            { data: { user: data.user, token: `${Math.random()}` } },
            { status: 201 },
        )
    }),
    http.post('/api/editorUpload', async () => {
        await delay(160)
        return HttpResponse.json({ location: 'https://loremflickr.com/500/500' })
    }),

    http.post('/api/editor-upload', async ({ request }) => {
        const data = await request.formData()
        const file = data.get('image') as File
        const blob = new Blob([file], { type: file?.type })
        const fileUrl = URL.createObjectURL(blob)

        await delay(160)
        return HttpResponse.json({
            file: {
                url: fileUrl,
            },
            success: 1,
        })
    }),
]

function formDataToObj(formData: FormData): Record<string, any> {
    const obj: Record<string, any> = {}
    formData.forEach((value, key) => {
        obj[key] = value
    })
    return obj
}

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
                    url: 'https://loremflickr.com/200/200',
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

function zipObjectDeep(keys: string[], values: any[]): Record<string, any> {
    const result: Record<string, any> = {}
    keys.forEach((key, i) => {
        // Normalize bracket notation to dot notation: a[b][c] -> a.b.c
        const normalized = key.replace(/\[([^\]]*)\]/g, '.$1').replace(/^\./, '')
        const parts = normalized.split('.')
        let current: any = result
        for (let j = 0; j < parts.length - 1; j++) {
            const part = parts[j]
            const nextPart = parts[j + 1]
            const nextIsIndex = /^\d+$/.test(nextPart)
            if (!(part in current)) {
                current[part] = nextIsIndex ? [] : {}
            }
            current = current[part]
        }
        const lastPart = parts[parts.length - 1]
        current[lastPart] = values[i]
    })
    return result
}
