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


