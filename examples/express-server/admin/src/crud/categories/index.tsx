import { createCRUD, SlugInput, TextInput } from 'admiral'
import React from 'react'

export const CRUD = createCRUD({
    path: '/categories',
    resource: 'categories',
    index: {
        title: 'Categories',
        newButtonText: 'Add',
        tableColumns: [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 90,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Slug',
                dataIndex: 'slug',
                key: 'slug',
            },
        ],
    },
    form: {
        create: {
            fields: (
                <>
                    <TextInput label="Name" name="name" placeholder="Name" required />
                    <SlugInput from="name" label="Slug" name="slug" placeholder="Slug" required />
                </>
            ),
        },
        edit: {
            fields: (
                <>
                    <TextInput label="Name" name="name" placeholder="Name" required />
                    <SlugInput from="name" label="Slug" name="slug" placeholder="Slug" required />
                </>
            ),
        },
    },
    // filter: {
    //     topToolbarButtonText: 'Filters',
    //     fields: (
    //         <>
    //             <TextInput label="Name" name="name" placeholder="Name" />
    //             <TextInput label="Email" name="email" placeholder="Email" />
    //         </>
    //     ),
    // },
    create: {
        title: 'Create Category',
    },
    update: {
        title: (id: string) => `Edit Category #${id}`,
    },
})
