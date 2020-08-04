import request from './request'

function materialList(data) {
  return request({
    url: '/api/leju/admin/material/list',
    method: 'GET',
    data
  })
}

function materialDel(data) {
  return request({
    url: '/api/leju/admin/material/del',
    method: 'GET',
    data
  })
}

function materialUploadImg(data) {
  return request({
    url: '/api/leju/admin/material/uploadImg',
    method: 'POST',
    data
  })
}

export default {
    materialList,
    materialDel,
    materialUploadImg
}
