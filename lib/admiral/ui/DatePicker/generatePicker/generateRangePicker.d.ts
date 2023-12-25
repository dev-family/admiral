import { GenerateConfig } from 'rc-picker/lib/generate/index';
import '../DatePicker.scss';
declare function generateRangePicker<DateType>(generateConfig: GenerateConfig<DateType>): import("./interfaces").PickerComponentClass<import("./interfaces").PickerRangeProps<DateType>, unknown>;
export default generateRangePicker;
