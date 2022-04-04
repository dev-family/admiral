import React from 'react'
import { Select } from '../Select'
import type { SelectProps } from '../Select/interfaces'
interface MiniOrMiddleSelectInterface extends React.FC<SelectProps> {
    Option: typeof Select.Option
}
export declare const MiddleSelect: MiniOrMiddleSelectInterface
export declare const MiniSelect: MiniOrMiddleSelectInterface
export {}
