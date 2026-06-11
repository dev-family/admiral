import { CRUDConfig } from './interfaces.js';
export declare function createCRUD<RecordType extends {
    id: number | string;
} = any>(config: CRUDConfig<RecordType>): {
    IndexPage: () => import("react/jsx-runtime").JSX.Element;
    CreatePage: () => import("react/jsx-runtime").JSX.Element;
    UpdatePage: ({ id }: {
        id: string;
    }) => import("react/jsx-runtime").JSX.Element;
};
