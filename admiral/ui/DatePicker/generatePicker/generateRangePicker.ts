import type { GenerateConfig } from 'rc-picker/es/generate/index'
import '../DatePicker.scss'
import generateSingleRangePicker from './generateSingleRangePicker'

function generateRangePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
    const { DateRangePicker } = generateSingleRangePicker(generateConfig as GenerateConfig<any>)
    return DateRangePicker
}

export default generateRangePicker
