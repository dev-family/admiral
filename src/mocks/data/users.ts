import { SortOrder } from '@/admiral/ui/Table/hooks/useSorter'

export interface IUser {
    id: number
    key: number
    name: string
    age: number | null
    address: string
    email: string
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
                age: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
                address: `London Park no. ${i}`,
                email: 'test@test.com',
            })
            this.id += 1
        }

        return data
    }

    add(data: Partial<IUser>) {
        const newId = ++this.id
        const newUser = {
            name: '',
            age: null,
            address: '',
            email: '',
            ...data,
            id: newId,
            key: newId,
        }

        this.users = [newUser, ...this.users]
        return newUser
    }

    delete(id: number) {
        this.users = this.users.filter((user) => user.id !== id)
    }

    update(id: number, data: IUser) {
        this.users = this.users.map((user) => {
            if (user.id === id) return data
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
                if (sortOrder === 'descend') {
                    // по убыванию
                    if (userA[sortField]! < userB[sortField]!) {
                        return -1
                    }
                    if (userA[sortField]! > userB[sortField]!) {
                        return 1
                    }
                    return 0
                }
                if (sortOrder === 'ascend') {
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
                if (sortOrder === 'descend') {
                    // по убыванию
                    return (userB[sortField] as number) - (userA[sortField] as number)
                }
                if (sortOrder === 'ascend') {
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

    get length() {
        return this.users.length
    }
}
