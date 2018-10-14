import request from '../utils/request'

export function queryOrderList(query) {
  return request({
    url: '/api/order/list',
    method: 'get',
    params: query
  })
}
export function instertOrder(params) {
  return request({
    url: '/api/order/insert',
    method: 'POST',
    data: params
  })
}
export function updateOrder(params) {
  return request({
    url: '/api/order/update',
    method: 'POST',
    data: params
  })
}



