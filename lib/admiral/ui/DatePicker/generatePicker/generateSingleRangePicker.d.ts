import { GenerateConfig } from 'rc-picker/lib/generate/index';
import { PickerComponentClass, PickerRangeProps } from './interfaces';
export default function generateSingleRangePicker<DateType>(generateConfig: GenerateConfig<DateType>): {
    DateRangePicker: PickerComponentClass<PickerRangeProps<DateType>, unknown>;
};
