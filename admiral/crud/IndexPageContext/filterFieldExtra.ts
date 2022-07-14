import React from 'react'
import { OptionType } from '../../dataProvider/interfaces'
import { DefaultOptionType } from '../../ui/Select/interfaces'
import { SelectInputProps, TimePickerInputProps } from '../../form'
import { TimePickerExtra, SelectExtra } from './interfaces'

export function getTimePickerExtra(
    timePicker: React.ReactElement<TimePickerInputProps>,
): TimePickerExtra {
    const {
        props: { format },
    } = timePicker

    return {
        format,
    }
}

export function getSelectExtra(select: React.ReactElement<SelectInputProps>): SelectExtra {
    const {
        props: { children },
    } = select

    const childrenArr = React.Children.toArray(children) as React.ReactElement<DefaultOptionType>[]

    const options: OptionType[] =
        childrenArr.length > 0
            ? childrenArr.map((child) => {
                  return {
                      label: child.props.children as unknown as string,
                      value: child.props.value as string,
                  }
              })
            : []

    return {
        options,
    }
}
