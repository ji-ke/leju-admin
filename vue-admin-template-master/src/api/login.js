import request from './request'

function doLogin (data) {
    return request({
        url: '/admin/login/doLogin',
        method: 'POST',
        data
    })
}

export default {
    doLogin
}