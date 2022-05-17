import { GenerateConfig } from 'rc-picker/lib/generate/index';
import { PickerProps, PickerComponentClass } from './interfaces';
export default function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>): {
    DatePicker: PickerComponentClass<PickerProps<DateType>, unknown>;
};
