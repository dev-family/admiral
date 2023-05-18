/// <reference types="react" />
import { OptionType, RecordOptions } from '../../dataProvider/interfaces';
import { FormInputType } from '../../form/interfaces';
import { SortOrder } from '../../ui/Table/interfaces';
export declare type CrudIndexUrlState = {
    page: string;
    page_size: string;
    filter: Record<string, any>;
    sort: Record<string, SortOrder>;
    search: string;
} & {
    [x: string]: any;
};
export declare type CrudIndexPageValueType = {
    filterDrawer: boolean;
    setFilterDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    urlState: CrudIndexUrlState;
    setUrlState: React.Dispatch<React.SetStateAction<Partial<CrudIndexUrlState>>>;
    filter: {
        fields: FilterField[];
        options: RecordOptions;
        setFilterOptions: React.Dispatch<React.SetStateAction<RecordOptions>>;
    };
};
export declare type FilterField = {
    label?: string;
    name: string;
    type: FormInputType;
    extra: {
        timePicker?: TimePickerExtra;
    };
};
export declare type TimePickerExtra = {
    format: string;
};
export declare type SelectExtra = {
    options: OptionType[];
};
