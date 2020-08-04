import request from './request'

function orderList(data) {
  return request({
    url: '/api/leju/admin/order/list',
    method: 'GET',
    data
  })
}

function orderUserInfo(data) {
  return request({
    url: '/api/leju/admin/order/orderUserInfo',
    method: 'GET',
    data
  })
}

function orderDetail(data) {
  return request({
    url: '/api/leju/admin/order/detail',
    method: 'GET',
    data
  })
}

function closeOrder(data) {
  return request({
    url: '/api/leju/admin/order/closeOrder',
    method: 'GET',
    data
  })
}

function orderDelFocus(data) {
  return request({
    url: '/api/leju/admin/order/delFocus',
    method: 'GET',
    data
  })
}

function orderSendDone(data) {
  return request({
    url: '/api/leju/admin/order/sendDone',
    method: 'POST',
    data
  })
}

function closeOrderByBack(data) {
  return request({
    url: '/api/leju/admin/order/closeOrderByBack',
    method: 'POST',
    data
  })
}

export default {
  orderList,
  orderUserInfo,
  orderDetail,
  closeOrder,
  orderDelFocus,
  orderSendDone,
  closeOrderByBack
}
