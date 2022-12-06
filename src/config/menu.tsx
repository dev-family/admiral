import React from 'react'
import { Menu, SubMenu, MenuItemLink } from '../../admiral'

const CustomMenu = () => {
    return (
        <Menu>
            <MenuItemLink icon="FiCircle" name="Base CRUD" to="/base-crud" />
            <MenuItemLink icon="FiStar" name="Advanced Edit Page" to="/advanced-edit-page" />
            <MenuItemLink
                icon="FiAlignJustify"
                name="Table without actions"
                to="/table-without-actions"
            />
            <MenuItemLink icon="FiCheckSquare" name="Bulk actions" to="/bulk-actions" />
            <MenuItemLink
                icon="FiSidebar"
                name="CRUD with custom drawer"
                to="/crud-with-custom-drawer"
            />
            <MenuItemLink icon="FiCodepen" name="Custom Interface" to="/custom-interface" />
            <MenuItemLink
                icon="FiUsers"
                name="Users"
                to="/crud-users"
                badge={{ count: 15, status: 'error' }}
            />
            <SubMenu icon="FiSettings" name="Components" to="/components" badge={{ dot: true }}>
                <MenuItemLink
                    icon="FiBox"
                    name="Table"
                    to="/components/table"
                    badge={{ count: 5 }}
                />
                <MenuItemLink icon="FiBox" name="Checkbox" to="/components/checkbox" />
                <MenuItemLink icon="FiBox" name="Pagination" to="/components/pagination" />
                <MenuItemLink icon="FiBox" name="Switch" to="/components/switch" />
                <MenuItemLink icon="FiBox" name="Textarea" to="/components/textarea" />
                <MenuItemLink icon="FiBox" name="Translatable" to="/components/translatable" />
                <MenuItemLink icon="FiBox" name="Datepicker" to="/components/datepicker" />
                <MenuItemLink icon="FiBox" name="Timepicker" to="/components/timepicker" />
                <MenuItemLink icon="FiBox" name="Upload" to="/components/upload" />
                <MenuItemLink icon="FiBox" name="Card" to="/components/card" />
                <MenuItemLink icon="FiBox" name="Editor" to="/components/editor" />
                <MenuItemLink icon="FiBox" name="Colorpicker" to="/components/colorpicker" />
                <MenuItemLink icon="FiBox" name="Typography" to="/components/typography" />
                <MenuItemLink icon="FiBox" name="Drawer" to="/components/drawer" />
                <MenuItemLink icon="FiBox" name="Tabs" to="/components/tabs" />
                <MenuItemLink icon="FiBox" name="Badge" to="/components/badge" />
            </SubMenu>
        </Menu>
    )
}

export default CustomMenu
