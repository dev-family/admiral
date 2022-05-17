import React from 'react'
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
import { PickerMode } from 'rc-picker/lib/interface'
import { GenerateConfig } from 'rc-picker/lib/generate/index'
import ruRU from '../locale/ru_RU'
import { getPlaceholder } from '../util'
import { PickerProps, getTimeProps, PickerComponentClass } from './interfaces'
import PickerButton from '../PickerButton'
import PickerTag from '../PickerTag'

export default function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
    type DatePickerProps = PickerProps<DateType>

    function getPicker<InnerPickerProps extends DatePickerProps>(
        picker?: PickerMode,
        displayName?: string,
    ) {
        class Picker extends React.Component<InnerPickerProps> {
            static displayName: string
            pickerRef = React.createRef<RCPicker<DateType>>()

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
                    placeholder,
                    alert,
                    ...restProps
                } = this.props
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
                        ? getTimeProps({ format, picker: mergedPicker, ...showTime })
                        : {}),
                    ...(mergedPicker === 'time'
                        ? getTimeProps({ format, ...this.props, picker: mergedPicker })
                        : {}),
                }

                return (
                    <RCPicker<DateType>
                        ref={this.pickerRef}
                        placeholder={getPlaceholder(mergedPicker, ruRU, placeholder)}
                        suffixIcon={mergedPicker === 'time' ? <FiClock /> : <FiCalendar />}
                        clearIcon={<AiFillCloseCircle />}
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
                        transitionName="admiral-picker-dropdown-slide-up"
                        {...additionalProps}
                        {...restProps}
                        {...additionalOverrideProps}
                        locale={ruRU.lang}
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

    const DatePicker = getPicker<DatePickerProps>()
    return { DatePicker }
}
