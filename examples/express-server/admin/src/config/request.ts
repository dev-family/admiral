import { storage, tokenStorageKey } from './authProvider'
import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'

axios.defaults.paramsSerializer = (params) => qs.stringify(params)

function _get(url: string) {
    return (query: AxiosRequestConfig = {}) => {
        const { cancelToken = axios.CancelToken.source().token, params = {}, headers } = query
        const token = storage.get(tokenStorageKey)

        return axios
            .get(url, {
                cancelToken,
                params: params,
                headers: {
                    ...headers,
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            })
            .then((response) => response.data)
    }
}

function _delete(url: string) {
    return (query: AxiosRequestConfig = {}) => {
        const { data, headers } = query
        const token = storage.get(tokenStorageKey)

        return axios
            .delete(url, {
                data,
                headers: {
                    ...headers,
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            })
            .then((response) => response.data)
    }
}

function _post(url: string) {
    return (query: AxiosRequestConfig = {}) => {
        const { cancelToken = axios.CancelToken.source().token, data, headers } = query
        const token = storage.get(tokenStorageKey)

        return axios
            .post(url, data, {
                headers: {
                    ...headers,
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                cancelToken,
            })
            .then((response) => response.data)
    }
}

function _postFD(url: string) {
    return (query: AxiosRequestConfig = {}) => {
        const { cancelToken = axios.CancelToken.source().token, data, headers } = query
        const token = storage.get(tokenStorageKey)
        const formdata = _toFormData(data)

        return axios
            .post(url, formdata, {
                headers: {
                    ...headers,
                    'Content-Type': 'multipart/form-data',
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                cancelToken,
            })
            .then((response) => response.data)
    }
}

export default {
    delete: _delete,
    get: _get,
    post: _post,
    postFD: _postFD,
}

function _toFormData(obj: Record<any, any>, form?: FormData, namespace?: string) {
    let fd = form || new FormData()
    let formKey

    for (let property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (namespace) {
                formKey = namespace + '[' + property + ']'
            } else {
                formKey = property
            }

            if (obj[property] instanceof Date) {
                fd.append(formKey, obj[property].toISOString())
            } else if (
                typeof obj[property] === 'object' &&
                obj[property] !== null &&
                !(obj[property] instanceof File)
            ) {
                _toFormData(obj[property], fd, formKey)
            } else {
                fd.append(formKey, obj[property] === null ? '' : obj[property])
            }
        }
    }

    return fd
}
