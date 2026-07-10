import { RecordOptions } from '../../dataProvider/interfaces.js';
import { FormInputType } from '../../form/interfaces.js';
import { SortOrder } from '../../ui/Table/interfaces.js';
export type CrudIndexUrlState = {
    page: string;
    page_size: string;
    filter: Record<string, any>;
    sort: Record<string, SortOrder>;
} & {
    [x: string]: any;
};
export type CrudIndexPageValueType = {
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
export type FilterField = {
    label?: string;
    name: string;
    /** Set for admiral inputs (static `inputName`); undefined for custom components */
    type?: FormInputType;
    component: React.ElementType;
    props: Record<string, unknown>;
    extra: {
        timePicker?: TimePickerExtra;
    };
};
export type TimePickerExtra = {
    format: string;
};
