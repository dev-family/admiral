import React, { useImperativeHandle } from 'react'
import cn from 'classnames'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
// Imported directly (not via the ui barrel): the icon elements below are
// created at module scope, so a barrel import would be a circular dependency.
import { Button } from '../../Button'
import { CommonPickerMethods, SizeType } from './interfaces'

export const pickerPrefixCls = 'admiral-picker'

export const pickerDropdownTransitionName = 'admiral-picker-dropdown-slide-up'

export const pickerAllowClear = { clearIcon: <AiFillCloseCircle /> }

const navButton = (icon: React.ReactNode) => (
    <Button component="span" view="clear" size="S" iconLeft={icon} />
)

export const pickerNavigationIcons = {
    prevIcon: navButton(<FiChevronLeft />),
    nextIcon: navButton(<FiChevronRight />),
    superPrevIcon: navButton(<FiChevronsLeft />),
    superNextIcon: navButton(<FiChevronsRight />),
}

export function getPickerClassName(options: {
    size?: SizeType
    alert?: boolean
    borderless?: boolean
    className?: string
}) {
    const { size, alert, borderless, className } = options

    return cn(
        {
            [`${pickerPrefixCls}__SizeL`]: size === 'L',
            [`${pickerPrefixCls}__SizeS`]: size === 'S',
            [`${pickerPrefixCls}__SizeXS`]: size === 'XS',
            [`${pickerPrefixCls}__Alert`]: alert,
            [`${pickerPrefixCls}__Borderless`]: borderless,
        },
        className,
    )
}

export function usePickerImperativeHandle<R extends CommonPickerMethods>(
    ref: React.Ref<CommonPickerMethods> | undefined,
    pickerRef: React.RefObject<R | null>,
) {
    useImperativeHandle(ref, () => ({
        focus: () => {
            pickerRef.current?.focus()
        },
        blur: () => {
            pickerRef.current?.blur()
        },
    }))
}
