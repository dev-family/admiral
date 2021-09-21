import * as Icons from 'react-icons/fi'

export interface IMenuItem {
    icon?: keyof typeof Icons
    name: string
    to?: string
    exact?: boolean
    children?: IMenuItem[]
}

const menu: IMenuItem[] = [
    {
        icon: 'FiHome',
        name: 'Home',
        to: '/',
    },
    {
        icon: 'FiUsers',
        name: 'Users',
        to: '/users',
        children: [
            {
                icon: 'FiUsers',
                name: 'Create User',
                to: '/users/create',
            },
        ],
    },

    {
        icon: 'FiUsers',
        name: 'CRUD Users',
        children: [
            {
                icon: 'FiUsers',
                name: 'Create CRUD User',
                to: '/crud-users/create',
            },
        ],
    },

    {
        icon: 'FiUsers',
        name: 'Custom page',
        to: '/custom-page',
    },
]

export default menu
