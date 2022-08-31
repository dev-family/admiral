import { arrayMove } from '@dnd-kit/sortable'
import { UploadFile } from 'admiral/ui/Upload/interfaces'
import { OptionType, RecordOptions, SortOrder } from '../../../admiral'

export interface IUser {
    id: number | string
    key: number | string
    age: number | string
    name: string
    email: string
    password: string
    group: string[]
    role: string
    avatar: UploadFile | null
    schedule: any[]
    active: boolean
    address?: string
}

export class UserList {
    private id: number
    private users: IUser[]
    private options: RecordOptions

    constructor() {
        this.id = 1
        this.users = this.init()
        this.options = {
            'schedule.day': [
                { label: 'Понедельник', value: '1' },
                { label: 'Вторник', value: '2' },
                { label: 'Среда', value: '3' },
                { label: 'Четверг', value: '4' },
                { label: 'Пятница', value: '5' },
                { label: 'Суббота', value: '6' },
                { label: 'Воскресенье', value: '7' },
            ],
            group: [
                { label: 'Aдминистрация', value: 'admin' },
                { label: 'Проектные менеджеры', value: 'project_manager' },
            ],
            role: [
                { label: 'Бухгалтер', value: 'accountant' },
                { label: 'Кадровик', value: 'recruiter' },
            ],
        }
    }

    private init() {
        const data: IUser[] = []
        for (let i = this.id; i < 25; i++) {
            data.push({
                id: i,
                key: i,
                name: `User ${i}`,
                age: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
                address: `London Park no. ${i}`,
                email: 'test@test.com',
                password: '12345',
                group: randomFromValues([['project_manager'], ['admin']]),
                role: randomFromValues(['accountant', 'recruiter']),
                avatar: null,
                schedule: [
                    {
                        id: 1,
                        day: 'Понедельник',
                        day_off: false,
                        start_time: '2014-02-11T11:30:30',
                        end_time: '2014-02-11T15:30:30',
                    },
                    {
                        id: 2,
                        day: 'Вторник',
                        day_off: false,
                        start_time: '12:00',
                        end_time: '16:00',
                    },
                    {
                        id: 3,
                        day: 'Среда',
                        day_off: false,
                        start_time: '12:00',
                        end_time: '16:00',
                    },
                    {
                        id: 4,
                        day: 'Четверг',
                        day_off: false,
                        start_time: '12:00',
                        end_time: '16:00',
                    },
                    {
                        id: 5,
                        day: 'Пятница',
                        day_off: false,
                        start_time: '12:00',
                        end_time: '16:00',
                    },
                    {
                        id: 6,
                        day: 'Суббота',
                        day_off: true,
                        start_time: '12:00',
                        end_time: '16:00',
                    },
                    {
                        id: 7,
                        day: 'Воскресенье',
                        day_off: true,
                        start_time: '12:00',
                        end_time: '16:00',
                    },
                ],
                active: randomFromValues([true, false]),
            })
            this.id += 1
        }

        return data
    }

    add(data: Partial<IUser>) {
        const newId = data.id || ++this.id
        const newUser = {
            name: '',
            age: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
            email: '',
            password: '12345',
            group: ['project_manager'],
            role: 'accountant',
            avatar: null,
            ...data,
            id: newId,
            key: newId,
            schedule: [],
            active: false,
        }

        this.users = [newUser, ...this.users]
        return newUser
    }

    delete(id: number | string): IUser | null {
        let removed: IUser | null = null

        this.users = this.users.filter((user) => {
            if (user.id !== +id) {
                return true
            } else {
                removed = user
                return false
            }
        })
        return removed
    }

    update(id: number | string, data: IUser) {
        this.users = this.users.map((user) => {
            if (+user.id === +id) return { ...user, ...data }
            return user
        })
    }

    reorder(prevId: number | string, nextId: number | string) {
        const getIndex = (id: number | string) => this.users.findIndex((item) => item.id == id)
        const prevIdx = getIndex(prevId)
        const nextIdx = getIndex(nextId)

        this.users = arrayMove(this.users, prevIdx, nextIdx)
        return this.users
    }

    sortBy(field: string | null, order: string | null) {
        const sortField = (field as keyof IUser) ?? null
        const sortOrder = (order as SortOrder) ?? null

        if (!sortField) return this.users

        return [...this.users].sort((userA, userB) => {
            const fieldTypeA = typeof userA[sortField]
            const fieldTypeB = typeof userB[sortField]

            if (fieldTypeA === fieldTypeB && fieldTypeA === 'string') {
                if (sortOrder === 'desc') {
                    // по убыванию
                    if (userA[sortField]! < userB[sortField]!) {
                        return -1
                    }
                    if (userA[sortField]! > userB[sortField]!) {
                        return 1
                    }
                    return 0
                }
                if (sortOrder === 'asc') {
                    // по возрастанию
                    if (userA[sortField]! > userB[sortField]!) {
                        return -1
                    }
                    if (userA[sortField]! < userB[sortField]!) {
                        return 1
                    }
                    return 0
                }

                return 0
            }

            if (fieldTypeA === fieldTypeB && fieldTypeA === 'number') {
                if (sortOrder === 'desc') {
                    // по убыванию
                    return (userB[sortField] as number) - (userA[sortField] as number)
                }
                if (sortOrder === 'asc') {
                    // по возрастанию
                    return (userA[sortField] as number) - (userB[sortField] as number)
                }

                return 0
            }

            return 0
        })
    }

    filterBy(params: Record<keyof IUser, any>, data: IUser[]) {
        let result: IUser[] = data
        if (params.name) {
            result = result.filter((i) =>
                i.name.toLocaleLowerCase().includes(params.name.toLowerCase()),
            )
        }
        if (params.role) {
            result = result.filter((i) => i.role === params.role)
        }
        if (params.active) {
            const active = params.active === 'true'
            result = result.filter((i) => i.active === active)
        }
        return result
    }

    getUsers(
        start: number = 0,
        end: number = -1,
        sort: string[] | undefined,
        filter?: Record<keyof IUser, any>,
    ) {
        const sortField = sort?.[0] ?? null
        const sortOrder = sort?.[1] ?? null

        const sortedUsers = this.sortBy(sortField, sortOrder)
        const filteredUsers = !!filter ? this.filterBy(filter, sortedUsers) : sortedUsers
        return [filteredUsers.slice(start, end), filteredUsers]
    }

    getUserById(id: number | string) {
        return this.users.find((user) => user.id == id)
    }

    getOptions(initialValues?: Record<keyof IUser, any>) {
        let options = { ...this.options }
        if (initialValues?.role) {
            const fieldOptions = options.role
            const value: string = initialValues.role
            const option = this.getAllOptions('role').find((opt) => opt.value == value)
            if (!!option && fieldOptions && fieldOptions.every((opt) => opt.value != value)) {
                options['role'] = [option, ...options['role']]
            }
        }
        return options
    }

    private getAllOptions(field: keyof IUser): OptionType[] {
        if (field === 'role') {
            return [
                { label: 'Бухгалтер', value: 'accountant' },
                { label: 'Кадровик', value: 'recruiter' },
                { label: 'Программист', value: 'programmer' },
                { label: 'Менеджер', value: 'manager' },
                { label: 'Уборщик', value: 'janitor' },
                { label: 'Директор', value: 'director' },
                { label: 'Тестировщик', value: 'tester' },
            ]
        }
        return []
    }

    searchOptions(field: keyof IUser, query: string): OptionType[] {
        if (field === 'role') {
            const allOptions = this.getAllOptions(field)
            return allOptions.filter((opt) => opt.label.toLowerCase().includes(query.toLowerCase()))
        }
        return this.options[field] ?? []
    }

    get length() {
        return this.users.length
    }
}

function randomFromValues<T>(values: T[]) {
    const random = Math.floor(Math.random() * values.length)
    return values[random]
}
