import ApiService from './ApiService'

export async function apiCreateInstance(data) {
    console.log(data);
    return ApiService.fetchData({
        url: '/api/instance',
        method: 'post',
        data
    })
}

export async function apiGetTransctionHistoryData(data) {
    return ApiService.fetchData({
        url: '/api/instance/list',
        method: 'get',
        data,
    })
}

export async function apiDeleteInstance(instanceId) {
    return ApiService.fetchData({
        url: '/api/instance',
        method: 'delete',
        data: {
            instanceId
        },
    })
}

export async function apiUploadFile(fileType, url) {
    return ApiService.fetchData({
        url: '/api/file/automatic1111',
        method: 'post',
        data: {
           fileType,
           url
        },
    })
}
