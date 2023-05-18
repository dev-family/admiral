export declare type Identifier = string | number;
export interface IRecord {
    id: Identifier;
    [key: string]: any;
}
export interface FormRecord {
    [key: string]: any;
}
export interface SortPayload {
    field: string;
    order: string;
}
export interface FilterPayload {
    [k: string]: any;
}
export interface PaginationPayload {
    page: number;
    perPage: number;
}
export interface PaginationResponse {
    current_page: number;
    per_page: number;
    total: number;
}
export declare type OptionType = {
    value: string;
    label: string;
};
export declare type DataProvider = {
    getList: <RecordType extends IRecord = IRecord>(resource: string, params: Partial<GetListParams>) => Promise<GetListResult<RecordType>>;
    reorderList: (resource: string, params: ReorderParams) => Promise<void>;
    getOne: <RecordType extends IRecord = IRecord>(resource: string, params: GetOneParams) => Promise<GetOneResult<RecordType>>;
    getCreateFormData: <RecordType extends FormRecord = FormRecord>(resource: string) => Promise<GetFormDataResult<RecordType>>;
    getUpdateFormData: <RecordType extends FormRecord = FormRecord>(resource: string, params: GetOneParams) => Promise<GetFormDataResult<RecordType>>;
    getFiltersFormData: (resource: string, urlState?: Record<string, any>) => Promise<GetFiltersFormDataResult>;
    update: <RecordType extends IRecord = IRecord>(resource: string, params: UpdateParams) => Promise<UpdateResult<RecordType>>;
    create: <RecordType extends IRecord = IRecord>(resource: string, params: CreateParams) => Promise<CreateResult<RecordType>>;
    deleteOne: <RecordType extends IRecord = IRecord>(resource: string, params: DeleteParams) => Promise<DeleteResult<RecordType>>;
    [key: string]: any;
};
export interface GetListParams {
    pagination: PaginationPayload;
    sort: SortPayload;
    filter: any;
    search: string;
}
export interface GetListResult<RecordType extends IRecord = IRecord> {
    items: RecordType[];
    meta: PaginationResponse;
}
export interface ReorderParams<T = any> {
    data: T;
}
export interface GetOneParams {
    id: Identifier;
}
export interface RecordOptions {
    [k: string]: OptionType[];
}
export interface GetOneResult<RecordType extends IRecord = IRecord> {
    data: RecordType;
    values: RecordOptions;
}
export interface GetFormDataResult<RecordType extends FormRecord = FormRecord> {
    data: RecordType;
    values: RecordOptions;
}
export interface GetFiltersFormDataResult {
    options: RecordOptions;
}
export interface UpdateParams<T = any> {
    id: Identifier;
    data: T;
}
export interface UpdateResult<RecordType extends IRecord = IRecord> {
    data: RecordType;
}
export interface CreateParams<T = any> {
    data: T;
}
export interface CreateResult<RecordType extends IRecord = IRecord> {
    data: RecordType;
}
export interface DeleteParams {
    id: Identifier;
}
export interface DeleteResult<RecordType extends IRecord = IRecord> {
    data: RecordType;
}
