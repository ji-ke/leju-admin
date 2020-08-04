import request from './request'

function orderBackList(data) {
  return request({
    url: '/api/leju/admin/orderBack/list',
    method: 'GET',
    data
  })
}

function orderBackDetail(data) {
  return request({
    url: '/api/leju/admin/orderBack/detail',
    method: 'GET',
    data
  })
}

function agreeBack(data) {
  return request({
    url: '/api/leju/admin/orderBack/agreeBack',
    method: 'POST',
    data
  })
}
function closeOrder(data) {
  return request({
    url: '/api/leju/admin/order/closeOrder',
    method: 'POST',
    data
  })
}
function rejectBack(data) {
  return request({
    url: '/api/leju/admin/orderBack/rejectBack',
    method: 'POST',
    data
  })
}

function backDone(data) {
  return request({
    url: '/api/leju/admin/orderBack/backDone',
    method: 'POST',
    data
  })
}

// function closeOrder(data) {
//     return request({
//       url: '/api/leju/admin/orderBack/closeOrder',
//       method: 'POST',
//       data
//     })
// }
  
export default {
    orderBackList,
    orderBackDetail,
    agreeBack,
    rejectBack,
    backDone,
    // closeOrder
}
