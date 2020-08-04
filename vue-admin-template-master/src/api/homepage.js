import request from './request'

function baseInfo (data) {
    return request({
        url: '/api/leju/admin/dashboard/baseInfo',
        method: 'GET',
        data
    })
}

export default {
    baseInfo
}