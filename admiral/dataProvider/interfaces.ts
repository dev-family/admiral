export type Identifier = string | number
export interface Record {
    id: Identifier
    [key: string]: any
}

export interface SortPayload {
    field: string
    order: string
}

export interface FilterPayload {
    [k: string]: any
}

export interface PaginationPayload {
    page: number
    perPage: number
}

export interface PaginationResponse {
    current_page: number
    per_page: number
    total: number
}

export type OptionType = { value: string; label: string }

export type DataProvider = {
    getList: <RecordType extends Record = Record>(
        resource: string,
        params: Partial<GetListParams>,
    ) => Promise<GetListResult<RecordType>>

    reorderList: (resource: string, params: ReorderParams) => Promise<void>

    getOne: <RecordType extends Record = Record>(
        resource: string,
        params: GetOneParams,
    ) => Promise<GetOneResult<RecordType>>

    getCreateFormData: <RecordType extends Record = Record>(
        resource: string,
    ) => Promise<GetOneResult<RecordType>>

    getUpdateFormData: <RecordType extends Record = Record>(
        resource: string,
        params: GetOneParams,
    ) => Promise<GetOneResult<RecordType>>

    update: <RecordType extends Record = Record>(
        resource: string,
        params: UpdateParams,
    ) => Promise<UpdateResult<RecordType>>

    create: <RecordType extends Record = Record>(
        resource: string,
        params: CreateParams,
    ) => Promise<CreateResult<RecordType>>

    deleteOne: <RecordType extends Record = Record>(
        resource: string,
        params: DeleteParams,
    ) => Promise<DeleteResult<RecordType>>

    [key: string]: any
}

export interface GetListParams {
    pagination: PaginationPayload
    sort: SortPayload
    filter: any
}
export interface GetListResult<RecordType extends Record = Record> {
    items: RecordType[]
    meta: PaginationResponse
}

export interface ReorderParams<T = any> {
    data: T
}

export interface GetOneParams {
    id: Identifier
}

export interface RecordOptions {
    [k: string]: OptionType[]
}
export interface GetOneResult<RecordType extends Record = Record> {
    data: RecordType
    values: RecordOptions
}

export interface UpdateParams<T = any> {
    id: Identifier
    data: T
}
export interface UpdateResult<RecordType extends Record = Record> {
    data: RecordType
}

export interface CreateParams<T = any> {
    data: T
}
export interface CreateResult<RecordType extends Record = Record> {
    data: RecordType
}

export interface DeleteParams {
    id: Identifier
}
export interface DeleteResult<RecordType extends Record = Record> {
    data: RecordType
}
