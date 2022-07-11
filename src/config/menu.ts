import { IMenuItem } from '../../admiral'

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
            {
                icon: 'FiBox',
                name: 'Timepicker',
                to: '/components/timepicker',
            },
            {
                icon: 'FiBox',
                name: 'Upload',
                to: '/components/upload',
            },
            {
                icon: 'FiBox',
                name: 'Card',
                to: '/components/card',
            },
            {
                icon: 'FiBox',
                name: 'Editor',
                to: '/components/editor',
            },
            {
                icon: 'FiBox',
                name: 'Colorpicker',
                to: '/components/colorpicker',
            },
            {
                icon: 'FiBox',
                name: 'Typography',
                to: '/components/typography',
            },
            {
                icon: 'FiBox',
                name: 'Drawer',
                to: '/components/drawer',
            },
        ],
    },
]

export default menu
