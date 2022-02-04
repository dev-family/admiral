import { IMenuItem } from '@/admiral'

const menu: IMenuItem[] = [
    {
        icon: 'FiHome',
        name: 'Home',
        to: '/',
    },
    {
        icon: 'FiUsers',
        name: 'Users',
        children: [
            {
                icon: 'FiUsers',
                name: 'All Users',
                to: '/users',
            },
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
                name: 'All Users',
                to: '/crud-users',
            },
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
