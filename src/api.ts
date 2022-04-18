import _ from './request'

const apiUrl = '/api'

type apiType = {
    editorImageUpload: (uploadUrl: string, data: any) => Promise<string>
}

const api: apiType = {
    editorImageUpload: (uploadUrl: string, data: any) => {
        const url = `${apiUrl}/${uploadUrl}`
        return _.postFD(url)({ data }).then((data) => data.location)
    },
}

export default api
