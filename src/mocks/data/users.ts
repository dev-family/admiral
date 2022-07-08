import { arrayMove } from '@dnd-kit/sortable'
import { UploadFile } from 'admiral/ui/Upload/interfaces'
import { RecordOptions, SortOrder } from '../../../admiral'

export interface IUser {
    id: number | string
    key: number | string
    name: string
    email: string
    password: string
    group: string[]
    role: string
    avatar: UploadFile | null
    schedule: any[]
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
        }
    }

    private init() {
        const data: IUser[] = []
        for (let i = this.id; i < 25; i++) {
            data.push({
                id: i,
                key: i,
                name: `User ${i}`,
                email: 'test@test.com',
                password: '12345',
                group: ['project_manager'],
                role: 'accountant',
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
            })
            this.id += 1
        }

        return data
    }

    add(data: Partial<IUser>) {
        const newId = data.id || ++this.id
        const newUser = {
            name: '',
            email: '',
            password: '12345',
            group: ['project_manager'],
            role: 'accountant',
            avatar: null,
            ...data,
            id: newId,
            key: newId,
            schedule: [],
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
            if (user.id === +id) return { ...user, ...data }
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

    getUsers(start: number = 0, end: number = -1, sort?: string[]) {
        const sortField = sort?.[0] ?? null
        const sortOrder = sort?.[1] ?? null

        const sortedUsers = this.sortBy(sortField, sortOrder)
        return sortedUsers.slice(start, end)
    }

    getUserById(id: number | string) {
        return this.users.find((user) => user.id == id)
    }

    getOptions() {
        return this.options
    }

    get length() {
        return this.users.length
    }
}
