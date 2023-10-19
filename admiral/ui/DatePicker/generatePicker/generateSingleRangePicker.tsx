import React from 'react'
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
import { PickerMode } from 'rc-picker/lib/interface'
import { GenerateConfig } from 'rc-picker/lib/generate/index'
import enUs from '../locale/en_US'
import { getRangeTimeProps } from './getRangeTimeProps'
import PickerButton from '../PickerButton'
import PickerTag from '../PickerTag'
import { PickerComponentClass, PickerRangeProps } from './interfaces'

const defaultLocale = enUs

export default function generateSingleRangePicker<DateType>(
    generateConfig: GenerateConfig<DateType>,
) {
    type DateRangePickerProps = PickerRangeProps<DateType>

    function getPicker<InnerPickerProps extends DateRangePickerProps>(
        picker?: PickerMode,
        displayName?: string,
    ) {
        class Picker extends React.Component<InnerPickerProps> {
            static displayName: string
            pickerRef = React.createRef<RangePicker<DateType>>()

            focus = () => {
                if (this.pickerRef.current) {
                    this.pickerRef.current.focus()
                }
            }

            blur = () => {
                if (this.pickerRef.current) {
                    this.pickerRef.current.blur()
                }
            }

            renderPicker = () => {
                const {
                    getPopupContainer: customizeGetPopupContainer,
                    className,
                    size,
                    borderless = false,
                    alert,
                    locale,
                    separator = '',
                    ...restProps
                } = this.props
                const pickerLocale = { ...defaultLocale, ...locale }
                const { format, showTime } = this.props as any
                const prefixCls = cn('admiral-picker')
                const getPopupContainer = () =>
                    document.querySelector('#root > .Theme') as HTMLDivElement

                const additionalProps = {
                    showToday: true,
                }

                let additionalOverrideProps: any = {}
                if (picker) {
                    additionalOverrideProps.picker = picker
                }
                const mergedPicker = picker || this.props.picker

                additionalOverrideProps = {
                    ...additionalOverrideProps,
                    ...(showTime
                        ? getRangeTimeProps({ format, picker: mergedPicker, ...showTime })
                        : {}),
                    ...(mergedPicker === 'time'
                        ? getRangeTimeProps({ format, ...this.props, picker: mergedPicker })
                        : {}),
                }

                return (
                    <RangePicker<DateType>
                        ref={this.pickerRef}
                        placeholder={this.props.placeholder || ['from', 'to']}
                        suffixIcon={mergedPicker === 'time' ? <FiClock /> : <FiCalendar />}
                        clearIcon={<AiFillCloseCircle />}
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
                        allowClear
                        // transitionName="admiral-picker-dropdown-slide-up"
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
                        components={{ button: PickerButton, rangeItem: PickerTag }}
                    />
                )
            }

            render() {
                return <>{this.renderPicker()}</>
            }
        }

        if (displayName) {
            Picker.displayName = displayName
        }

        return Picker as PickerComponentClass<InnerPickerProps>
    }

    const DateRangePicker = getPicker<DateRangePickerProps>()
    return { DateRangePicker }
}
