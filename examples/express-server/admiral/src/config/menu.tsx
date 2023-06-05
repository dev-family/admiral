import React from 'react'
import { Menu, MenuItemLink } from 'admiral'

const CustomMenu = () => {
    return (
        <Menu>
            <MenuItemLink name="Users" to="/users" icon="FiUser" />
            <MenuItemLink name="Categories" to="/categories" icon="FiBarChart" />
            <MenuItemLink name="Posts" to="/posts" icon="FiBookOpen" />
        </Menu>
    )
}

export default CustomMenu
