import type { GenerateConfig } from 'rc-picker/lib/generate/index'
import generateSinglePicker from './generateSinglePicker'
import '../DatePicker.scss'

function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
    const { DatePicker } = generateSinglePicker(generateConfig as GenerateConfig<any>)
    return DatePicker
}

export default generatePicker
