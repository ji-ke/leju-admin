import request from './request'

function productList (data) {
    return request({
        url: '/api/leju/admin/product/list',
        method: 'GET',
        data
    })
}

function productDetail (data) {
    return request({
        url: '/api/leju/admin/product/detail',
        method: 'GET',
        data
    })
}

function productDelete (data) {
    return request({
        url: '/api/leju/admin/product/delete',
        method: 'GET',
        data
    })
}

function productSaveOrUpdate (data) {
    return request({
        url: '/api/leju/admin/product/saveOrUpdate',
        method: 'POST',
        data
    })
}

function productSwitchCode (data) {
    return request({
        url: '/api/leju/admin/product/switchCode',
        method: 'POST',
        data
    })
}


export default {
    productList,
    productDetail,
    productDelete,
    productSaveOrUpdate,
    productSwitchCode
}