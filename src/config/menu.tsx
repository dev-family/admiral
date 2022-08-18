import React from 'react'
import { Menu, SubMenu, MenuItemLink } from '../../admiral'

const CustomMenu = () => {
    return (
        <Menu>
            <MenuItemLink icon="FiUsers" name="Users" to="/crud-users" />
            <SubMenu icon="FiSettings" name="Components" to="/components">
                <MenuItemLink icon="FiBox" name="Table" to="/components/table" />
                <MenuItemLink icon="FiBox" name="Checkbox" to="/components/checkbox" />
                <MenuItemLink icon="FiBox" name="Pagination" to="/components/pagination" />
                <MenuItemLink icon="FiBox" name="Switch" to="/components/switch" />
                <MenuItemLink icon="FiBox" name="Textarea" to="/components/textarea" />
                <MenuItemLink icon="FiBox" name="Datepicker" to="/components/datepicker" />
                <MenuItemLink icon="FiBox" name="Timepicker" to="/components/timepicker" />
                <MenuItemLink icon="FiBox" name="Upload" to="/components/upload" />
                <MenuItemLink icon="FiBox" name="Card" to="/components/card" />
                <MenuItemLink icon="FiBox" name="Editor" to="/components/editor" />
                <MenuItemLink icon="FiBox" name="Colorpicker" to="/components/colorpicker" />
                <MenuItemLink icon="FiBox" name="Typography" to="/components/typography" />
                <MenuItemLink icon="FiBox" name="Drawer" to="/components/drawer" />
                <MenuItemLink icon="FiBox" name="Tabs" to="/components/tabs" />
            </SubMenu>
        </Menu>
    )
}

export default CustomMenu
