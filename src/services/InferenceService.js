import ApiService from './ApiService'

export async function txt2Img(data) {
    return ApiService.fetchData({
        url: '/sdapi/v1/txt2img',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}
