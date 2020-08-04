import request from './request'

function categoryList(data) {
  return request({
    url: '/api/leju/admin/kind/list',
    method: 'GET',
    data
  })
}

function categoryDel(data) {
  return request({
    url: '/api/leju/admin/kind/del',
    method: 'GET',
    data
  })
}

function categorySaveOrUpdate(data) {
  return request({
    url: '/api/leju/admin/kind/saveOrUpdate',
    method: 'POST',
    data
  })
}

export default {
  categoryList,
  categoryDel,
  categorySaveOrUpdate
}
