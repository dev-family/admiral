import { GenerateConfig } from 'rc-picker/lib/generate/index'
import '../DatePicker.scss'
import generateSingleRangePicker from './generateSingleRangePicker'

function generateRangePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
    const { DateRangePicker } = generateSingleRangePicker(generateConfig)
    return DateRangePicker
}

export default generateRangePicker
