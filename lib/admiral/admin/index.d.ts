import '../assets/global.css'
import React from 'react'
import type { IMenuItem } from '../ui'
import { HeaderLogoType } from '../ui/Layout/LayoutHeader'
import { DataProvider } from '../dataProvider'
export declare type AdminProps = {
    menu: IMenuItem[]
    logo?: HeaderLogoType
    dataProvider: DataProvider
}
export declare const Admin: React.FC<AdminProps>
