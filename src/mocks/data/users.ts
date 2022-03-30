import { UploadFile } from 'admiral/ui/Upload/interfaces'
import { SortOrder } from '../../../admiral'

export interface IUser {
    id: number | string
    key: number | string
    name: string
    email: string
    password: string
    group: string[]
    role: string
    avatar: UploadFile | null
}

export class UserList {
    private id: number
    private users: IUser[]

    constructor() {
        this.id = 1
        this.users = this.init()
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
        }

        this.users = [newUser, ...this.users]
        return newUser
    }

    delete(id: number | string): IUser | null {
        let removed: IUser | null = null
        this.users = this.users.filter((user) => {
            if (user.id !== id) {
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

    get length() {
        return this.users.length
    }
}
