import { GetFormDataResult, OptionType, UpdateResult } from '../admiral'
import { ITheme } from './mocks/data/theme'
import _ from './request'

const apiUrl = '/api'

type apiType = {
    editorImageUpload: (uploadUrl: string, data: any) => Promise<string>
    getAjaxSelectOptions: (resource: string, field: string, query?: string) => Promise<OptionType[]>
    getTheme: () => Promise<GetFormDataResult<ITheme>>
    updateTheme: (data: any) => Promise<UpdateResult>
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
    getTheme: () => {
        const url = `${apiUrl}/theme`
        return _.get(url)({})
    },
    updateTheme: (data) => {
        const url = `${apiUrl}/theme/update`
        return _.postFD(url)({ data })
    },
}

export default api
