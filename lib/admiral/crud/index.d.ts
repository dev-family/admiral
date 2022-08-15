/// <reference types="react" />
import { CRUDConfig } from './interfaces';
export declare function createCRUD<RecordType extends {
    id: number | string;
} = any>(config: CRUDConfig<RecordType>): {
    IndexPage: () => JSX.Element;
    CreatePage: () => JSX.Element;
    UpdatePage: ({ id }: {
        id: string;
    }) => JSX.Element;
};
