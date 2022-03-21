import { IMenuItem } from '@/admiral'

const menu: IMenuItem[] = [
    {
        icon: 'FiUsers',
        name: 'Пользователи',
        to: '/crud-users',
    },
    {
        icon: 'FiSettings',
        name: 'Компоненты',
        to: '/components',
        children: [
            {
                icon: 'FiBox',
                name: 'Table',
                to: '/components/table',
            },
            {
                icon: 'FiBox',
                name: 'Checkbox',
                to: '/components/checkbox',
            },
            {
                icon: 'FiBox',
                name: 'Pagination',
                to: '/components/pagination',
            },
            {
                icon: 'FiBox',
                name: 'Switch',
                to: '/components/switch',
            },
            {
                icon: 'FiBox',
                name: 'Textarea',
                to: '/components/textarea',
            },
            {
                icon: 'FiBox',
                name: 'Datepicker',
                to: '/components/datepicker',
            },
        ],
    },
]

export default menu
