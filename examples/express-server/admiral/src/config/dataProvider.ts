import _ from './request'
import type { DataProvider } from '@devfamily/admiral'

/*
 *
 * @example
 *
 * getList     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * getOne      => GET http://my.api.url/posts/123
 * getCreateFormData      => GET http://my.api.url/posts/create
 * create      => POST http://my.api.url/posts
 * getUpdateFormData      => GET http://my.api.url/posts/123/update
 * update      => POST http://my.api.url/posts/123
 * delete      => DELETE http://my.api.url/posts/123
 *
 */

export default (apiUrl: string): DataProvider => ({
    getList: (resource, params) => {
        const { page, perPage } = params.pagination || { page: 1, perPage: 10 }

        const query = {
            page,
            perPage,
            sort: params.sort,
            filter: params.filter,
        }

        const url = `${apiUrl}/${resource}`
        return _.get(url)({ params: query })
    },

    getOne: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        return _.get(url)({ params })
    },

    getCreateFormData: (resource) => {
        const url = `${apiUrl}/${resource}/create`
        return _.get(url)({})
    },

    getFiltersFormData: (resource) => {
        const url = `${apiUrl}/${resource}/filters`
        return _.get(url)({})
    },

    create: (resource, params) => {
        const url = `${apiUrl}/${resource}`
        return _.post(url)({ data: params.data })
    },

    getUpdateFormData: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}/update`
        return _.get(url)({ params })
    },

    update: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        return _.post(url)({ data: params.data })
    },

    deleteOne: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        return _.delete(url)()
    },

    reorderList: (resource, params) => {
        const url = `${apiUrl}/${resource}/reorder`
        return _.postFD(url)({ data: params.data })
    },
})
