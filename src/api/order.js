import request from '../utils/request'

export function queryOrderList(query) {
  return request({
    url: '/api/order/list',
    method: 'get',
    params: query
  })
}


