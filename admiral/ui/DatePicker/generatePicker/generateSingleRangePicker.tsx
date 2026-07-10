import React, { useRef } from 'react'
import { FiCalendar, FiClock } from 'react-icons/fi'
import { RangePicker } from 'rc-picker'
import type { PickerMode, RangePickerRef } from 'rc-picker/es/interface'
import type { GenerateConfig } from 'rc-picker/es/generate/index'
import { enUS } from '../locales'
import { getTimeProps } from './getTimeProps'
import PickerButton from '../PickerButton'
import { CommonPickerMethods, PickerRangeProps } from './interfaces'
import { getPopupContainer } from '../../../utils/helpers'
import {
    getPickerClassName,
    pickerAllowClear,
    pickerDropdownTransitionName,
    pickerNavigationIcons,
    pickerPrefixCls,
    usePickerImperativeHandle,
} from './shared'

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
            usePickerImperativeHandle(ref, pickerRef)

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
            const { format, showTime, showHour, showMinute, showSecond, use12Hours } = props
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
                ...(showTime ? getTimeProps({ format, picker: mergedPicker }) : {}),
                ...(mergedPicker === 'time'
                    ? getTimeProps({
                          format,
                          picker: mergedPicker,
                          showHour,
                          showMinute,
                          showSecond,
                          use12Hours,
                      })
                    : {}),
            }

            return (
                <RangePicker<DateType>
                    ref={pickerRef}
                    placeholder={props.placeholder || ['from', 'to']}
                    suffixIcon={mergedPicker === 'time' ? <FiClock /> : <FiCalendar />}
                    separator={separator}
                    {...pickerNavigationIcons}
                    allowClear={pickerAllowClear}
                    transitionName={pickerDropdownTransitionName}
                    {...additionalProps}
                    {...restProps}
                    {...additionalOverrideProps}
                    locale={pickerLocale.lang}
                    className={getPickerClassName({ size, alert, borderless, className })}
                    prefixCls={pickerPrefixCls}
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
