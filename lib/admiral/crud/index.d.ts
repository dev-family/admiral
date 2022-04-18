import { ColumnsType } from '../ui/Table/interfaces';
import React from 'react';
export declare type CRUDConfig<RecordType> = {
    path: string;
    actions?: React.ReactNode;
    resource: string;
    index: {
        title: string;
        newButtonText: string;
        tableOptions: ColumnsType<RecordType>;
    };
    table?: {
        dndRows?: boolean;
    };
    form: {
        create: {
            fields: React.ReactNode;
        };
        edit: {
            fields: React.ReactNode;
        };
    };
    create: {
        title: string;
    };
    update: {
        title: (id: string) => string;
    };
};
export declare function createCRUD<RecordType extends {
    id: number | string;
} = any>(config: CRUDConfig<RecordType>): {
    IndexPage: () => JSX.Element;
    CreatePage: () => JSX.Element;
    UpdatePage: ({ id }: {
        id: string;
    }) => JSX.Element;
};
