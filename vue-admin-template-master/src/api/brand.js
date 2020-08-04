import request from './request'

//品牌所有分类
function brandListAll(data) {
  return request({
    url: '/api/leju/admin/brand/listAll',
    method: 'GET',
    data
  })
}
//品牌分页
function brandList(data) {
  return request({
    url: '/api/leju/admin/brand/list',
    method: 'GET',
    data
  })
}

function brandDetail(data) {
  return request({
    url: '/api/leju/admin/brand/detail',
    method: 'GET',
    data
  })
}

function brandDel(data) {
  return request({
    url: '/api/leju/admin/brand/del',
    method: 'GET',
    data
  })
}

function brandSaveOrUpdate(data) {
  return request({
    url: '/api/leju/admin/brand/saveOrUpdate',
    method: 'POST',
    data
  })
}


export default {
  brandListAll,
  brandList,
  brandDetail,
  brandDel,
  brandSaveOrUpdate
}
