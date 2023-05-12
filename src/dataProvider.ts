import { DataProvider } from '../admiral'
import _ from './request'

/**
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

const dataProvider = (apiUrl: string): DataProvider => ({
    getList: (resource, params) => {
        const { page, perPage } = params.pagination || { page: 1, perPage: 10 }

        const query = {
            page,
            perPage,
            sort: params.sort,
            filter: params.filter,
            search: params.search,
        }

        const url = `${apiUrl}/${resource}`
        return _.get(url)({ params: query })
    },

    reorderList: (resource, params) => {
        const url = `${apiUrl}/${resource}/reorder`
        return _.postFD(url)({ data: params.data })
    },

    getOne: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        return _.get(url)({ params })
    },

    getCreateFormData: (resource) => {
        const url = `${apiUrl}/${resource}/create`
        return _.get(url)({})
    },

    getFiltersFormData: (resource, urlState) => {
        const url = `${apiUrl}/${resource}/filters`
        return _.get(url)({ params: urlState })
    },

    create: (resource, params) => {
        const url = `${apiUrl}/${resource}`
        return _.postFD(url)({ data: params.data })
    },

    getUpdateFormData: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}/update`
        return _.get(url)({ params })
    },

    update: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        return _.postFD(url)({ data: params.data })
    },

    deleteOne: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        return _.delete(url)()
    },
})

export default dataProvider
