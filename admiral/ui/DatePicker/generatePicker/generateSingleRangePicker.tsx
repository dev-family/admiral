import React, { useRef, useImperativeHandle } from 'react'
import cn from 'classnames'
import { Button } from '../..'
import {
    FiCalendar,
    FiClock,
    FiChevronLeft,
    FiChevronRight,
    FiChevronsLeft,
    FiChevronsRight,
} from 'react-icons/fi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { RangePicker } from 'rc-picker'
import type { PickerMode, RangePickerRef } from 'rc-picker/lib/interface'
import type { GenerateConfig } from 'rc-picker/lib/generate/index'
import { enUS } from '../locales'
import { getRangeTimeProps } from './getRangeTimeProps'
import PickerButton from '../PickerButton'
import { CommonPickerMethods, PickerRangeProps } from './interfaces'
import { getPopupContainer } from '../../../utils/helpers'

const defaultLocale = enUS

export default function generateSingleRangePicker<DateType extends object>(
    generateConfig: GenerateConfig<DateType>,
) {
    type DateRangePickerProps = PickerRangeProps<DateType>

    function getPicker<InnerPickerProps extends DateRangePickerProps>(
        picker?: PickerMode,
        displayName?: string,
    ) {
        function PickerComponent({
            ref,
            ...props
        }: InnerPickerProps & { ref?: React.Ref<CommonPickerMethods> }) {
            const pickerRef = useRef<RangePickerRef>(null)

            useImperativeHandle(ref, () => ({
                focus: () => {
                    pickerRef.current?.focus()
                },
                blur: () => {
                    pickerRef.current?.blur()
                },
            }))

            const {
                getPopupContainer: customizeGetPopupContainer,
                className,
                size,
                borderless = false,
                alert,
                locale,
                separator = '',
                ...restProps
            } = props
            const pickerLocale = { ...defaultLocale, ...locale }
            const { format, showTime } = props as any
            const prefixCls = cn('admiral-picker')
            const additionalProps = {
                showNow: true,
            }

            let additionalOverrideProps: any = {}
            if (picker) {
                additionalOverrideProps.picker = picker
            }
            const mergedPicker = picker || props.picker

            additionalOverrideProps = {
                ...additionalOverrideProps,
                ...(showTime
                    ? getRangeTimeProps({ format, picker: mergedPicker, ...showTime })
                    : {}),
                ...(mergedPicker === 'time'
                    ? getRangeTimeProps({ format, ...props, picker: mergedPicker })
                    : {}),
            }

            return (
                <RangePicker<DateType>
                    ref={pickerRef}
                    placeholder={props.placeholder || ['from', 'to']}
                    suffixIcon={mergedPicker === 'time' ? <FiClock /> : <FiCalendar />}
                    separator={separator}
                    prevIcon={
                        <Button
                            component="span"
                            view="clear"
                            size="S"
                            iconLeft={<FiChevronLeft />}
                        />
                    }
                    nextIcon={
                        <Button
                            component="span"
                            view="clear"
                            size="S"
                            iconLeft={<FiChevronRight />}
                        />
                    }
                    superPrevIcon={
                        <Button
                            component="span"
                            view="clear"
                            size="S"
                            iconLeft={<FiChevronsLeft />}
                        />
                    }
                    superNextIcon={
                        <Button
                            component="span"
                            view="clear"
                            size="S"
                            iconLeft={<FiChevronsRight />}
                        />
                    }
                    allowClear={{ clearIcon: <AiFillCloseCircle /> }}
                    {...additionalProps}
                    {...restProps}
                    {...additionalOverrideProps}
                    locale={pickerLocale.lang}
                    className={cn(
                        {
                            [`${prefixCls}__SizeL`]: size === 'L',
                            [`${prefixCls}__SizeS`]: size === 'S',
                            [`${prefixCls}__SizeXS`]: size === 'XS',
                            [`${prefixCls}__Alert`]: alert,
                            [`${prefixCls}__Borderless`]: borderless,
                        },
                        className,
                    )}
                    prefixCls={prefixCls}
                    getPopupContainer={customizeGetPopupContainer || getPopupContainer}
                    generateConfig={generateConfig}
                    components={{ button: PickerButton }}
                />
            )
        }

        if (displayName) {
            PickerComponent.displayName = displayName
        }

        return PickerComponent
    }

    const DateRangePicker = getPicker<DateRangePickerProps>()
    return { DateRangePicker }
}
