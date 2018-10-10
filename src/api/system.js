import request from '../utils/request'

export function queryCustomService(query) {
  return request({
    url: '/sys/customServices',
    method: 'get'
  })
}

export function queryCustom(query) {
  return request({
    url: '/api/customer/info',
    method: 'get',
    params: query
  })
}
