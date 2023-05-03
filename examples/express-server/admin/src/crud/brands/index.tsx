import { createCRUD, SlugInput, TextInput } from 'admiral'
import React from 'react'

export const CRUD = createCRUD({
    path: '/brands',
    resource: 'brands',
    index: {
        title: 'Brands',
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
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
            },
        ],
    },
    form: {
        create: {
            fields: (
                <>
                    <TextInput label="Name" name="name" placeholder="Name" required />
                    <SlugInput from="name" label="Slug" name="slug" placeholder="Slug" required />
                    <TextInput
                        label="Description"
                        name="description"
                        placeholder="Description"
                        required
                    />
                </>
            ),
        },
        edit: {
            fields: (
                <>
                    <TextInput label="Name" name="name" placeholder="Name" required />
                    <SlugInput from="name" label="Slug" name="slug" placeholder="Slug" required />
                    <TextInput
                        label="Description"
                        name="description"
                        placeholder="Description"
                        required
                    />
                </>
            ),
        },
    },
    filter: {
        topToolbarButtonText: 'Filters',
        fields: (
            <>
                <TextInput label="Name" name="name" placeholder="Name" />
            </>
        ),
    },
    create: {
        title: 'Create Brand',
    },
    update: {
        title: (id: string) => `Edit Brand #${id}`,
    },
})
