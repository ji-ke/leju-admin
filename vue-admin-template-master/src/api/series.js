import request from './request'

function seriesAllList(data) {
  return request({
    url: '/api/leju/admin/series/allList',
    method: 'GET',
    data
  })
}

function seriesDel(data) {
  return request({
    url: '/api/leju/admin/series/del',
    method: 'GET',
    data
  })
}

function seriesSaveOrUpdate(data) {
  return request({
    url: '/api/leju/admin/series/saveOrUpdate',
    method: 'POST',
    data
  })
}

export default {
    seriesAllList,
    seriesDel,
    seriesSaveOrUpdate
}
