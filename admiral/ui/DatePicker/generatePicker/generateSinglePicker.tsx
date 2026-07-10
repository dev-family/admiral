import React, { useRef } from 'react'
import { FiCalendar, FiClock } from 'react-icons/fi'
import RCPicker from 'rc-picker'
import type { PickerMode, PickerRef as RCPickerRef } from 'rc-picker/es/interface'
import type { GenerateConfig } from 'rc-picker/es/generate/index'
import { enUS } from '../locales'
import { getPlaceholder } from '../util'
import { PickerProps, CommonPickerMethods } from './interfaces'
import PickerButton from '../PickerButton'
import { getTimeProps } from './getTimeProps'
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

export default function generatePicker<DateType extends object>(
    generateConfig: GenerateConfig<DateType>,
) {
    type DatePickerProps = PickerProps<DateType>

    function getPicker<InnerPickerProps extends DatePickerProps>(
        picker?: PickerMode,
        displayName?: string,
    ) {
        function PickerComponent({
            ref,
            ...props
        }: InnerPickerProps & { ref?: React.Ref<CommonPickerMethods> }) {
            const pickerRef = useRef<RCPickerRef>(null)
            usePickerImperativeHandle(ref, pickerRef)

            const {
                getPopupContainer: customizeGetPopupContainer,
                className,
                size,
                borderless = false,
                placeholder,
                alert,
                locale,
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

            const showTimeConfig = typeof showTime === 'object' ? showTime : {}
            additionalOverrideProps = {
                ...additionalOverrideProps,
                ...(showTime
                    ? getTimeProps({ format, picker: mergedPicker, ...showTimeConfig })
                    : {}),
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
                <RCPicker<DateType>
                    ref={pickerRef}
                    placeholder={getPlaceholder(mergedPicker, pickerLocale, placeholder)}
                    suffixIcon={mergedPicker === 'time' ? <FiClock /> : <FiCalendar />}
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

    const DatePicker = getPicker<DatePickerProps>()
    return { DatePicker }
}
