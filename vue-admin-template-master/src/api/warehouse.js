import request from './request'

function skuList(data) {
  return request({
    url: '/api/leju/admin/productSku/skuList',
    method: 'GET',
    data
  })
}

function skuDel(data) {
  return request({
    url: '/api/leju/admin/productSku/del',
    method: 'GET',
    data
  })
}

function skuSaveOrUpdate(data) {
  return request({
    url: '/api/leju/admin/productSku/saveOrUpdate',
    method: 'POST',
    data
  })
}

export default {
    skuList,
    skuDel,
    skuSaveOrUpdate
}
