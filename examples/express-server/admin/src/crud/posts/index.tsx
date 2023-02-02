import { createCRUD, TextInput, SlugInput, MultilineTextInput, BooleanInput, AjaxSelectInput } from 'admiral';
import React from 'react';
import api from '../../config/api';

const resource = 'posts';

export const CRUD = createCRUD({
    path: '/posts',
    resource: resource,
    index: {
        title: 'Posts',
        newButtonText: 'Add',
        tableColumns: [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 90,
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Slug',
                dataIndex: 'slug',
                key: 'slug',
            },
            {
                title: 'User',
                dataIndex: 'user',
                key: 'user',
            },
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
            },
        ],
    },
    form: {
        create: {
            fields: (
                <>
                    <TextInput label='Title' name='title' placeholder='Title' required />
                    <SlugInput from='title' label='Slug' name='slug' placeholder='Slug' required />
                    <AjaxSelectInput
                        label='User'
                        name='userId'
                        placeholder='User'
                        fetchOptions={(field, query) => api.getAjaxSelectOptions(resource, field, query)}
                    />
                    <AjaxSelectInput
                        label='Category'
                        name='categoryId'
                        placeholder='Category'
                        fetchOptions={(field, query) => api.getAjaxSelectOptions(resource, field, query)}
                    />
                    <MultilineTextInput name='content' label='Content' columnSpan={2} minRows={6} />
                    <BooleanInput name='published' label='Published' />
                </>
            ),
        },
        edit: {
            fields: (
                <>
                    <TextInput label='Title' name='title' placeholder='title' required />
                    <SlugInput from='title' label='Slug' name='slug' placeholder='slug' required />
                    <AjaxSelectInput
                        label='User'
                        name='userId'
                        placeholder='User'
                        fetchOptions={(field, query) => api.getAjaxSelectOptions(resource, field, query)}
                    />
                    <AjaxSelectInput
                        label='Category'
                        name='categoryId'
                        placeholder='Category'
                        fetchOptions={(field, query) => api.getAjaxSelectOptions(resource, field, query)}
                    />
                    <MultilineTextInput name='content' label='Content' />
                    <BooleanInput name='published' label='Published' />
                </>
            ),
        },
    },
    create: {
        title: 'Create Post',
    },
    update: {
        title: (id: string) => `Edit Post #${id}`,
    },
});
