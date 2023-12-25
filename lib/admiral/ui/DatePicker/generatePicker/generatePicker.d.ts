import { GenerateConfig } from 'rc-picker/lib/generate/index';
import '../DatePicker.scss';
declare function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>): import("./interfaces").PickerComponentClass<import("./interfaces").PickerProps<DateType>, unknown>;
export default generatePicker;
