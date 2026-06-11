import _ from './request'

import { OptionType } from '@devfamily/admiral'

const apiUrl = import.meta.env.VITE_API_URL || '/api'

type apiType = {
    editorImageUpload: (uploadUrl: string, data: any) => Promise<string>
    getAjaxSelectOptions: (resource: string, field: string, query?: string) => Promise<OptionType[]>
}

const api: apiType = {
    editorImageUpload: (uploadUrl: string, data: any) => {
        const url = `${apiUrl}/${uploadUrl}`
        return _.postFD(url)({ data }).then((data) => data.location)
    },
    getAjaxSelectOptions: (resource, field, query) => {
        const url = `${apiUrl}/${resource}/ajax-select/${field}`
        return _.get(url)({ params: { query } })
    },
}

export default api
