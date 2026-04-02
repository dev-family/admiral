import React, { useRef, useImperativeHandle } from 'react'
import cn from 'classnames'
import { Button } from '../../../ui'
import {
    FiCalendar,
    FiClock,
    FiChevronLeft,
    FiChevronRight,
    FiChevronsLeft,
    FiChevronsRight,
} from 'react-icons/fi'
import { AiFillCloseCircle } from 'react-icons/ai'
import RCPicker from 'rc-picker'
import type { PickerMode, PickerRef as RCPickerRef } from 'rc-picker/lib/interface'
import type { GenerateConfig } from 'rc-picker/lib/generate/index'
import { enUS } from '../locales'
import { getPlaceholder } from '../util'
import { PickerProps, CommonPickerMethods } from './interfaces'
import PickerButton from '../PickerButton'
import { getTimeProps } from './getTimeProps'
import { getPopupContainer } from '../../../utils/helpers'

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
                placeholder,
                alert,
                locale,
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
                ...(showTime ? getTimeProps({ format, picker: mergedPicker, ...showTime }) : {}),
                ...(mergedPicker === 'time'
                    ? getTimeProps({ format, ...props, picker: mergedPicker } as any)
                    : {}),
            }

            return (
                <RCPicker<DateType>
                    ref={pickerRef}
                    placeholder={getPlaceholder(mergedPicker, pickerLocale, placeholder as string)}
                    suffixIcon={mergedPicker === 'time' ? <FiClock /> : <FiCalendar />}
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
                    transitionName="admiral-picker-dropdown-slide-up"
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

    const DatePicker = getPicker<DatePickerProps>()
    return { DatePicker }
}
