import request from '../utils/request'

export function queryAddress(query) {
  return request({
    url: '/api/address/queryAddress',
    method: 'get',
    params: query
  })
}
export function insertAddress(params) {
  return request({
    url: '/api/address/insert',
    method: 'POST',
    data: params
  })
}
export function updateAddress(params) {
  return request({
    url: '/api/address/update',
    method: 'POST',
    data: params
  })
}
export function deleteAddress(params) {
  return request({
    url: '/api/address/delete',
    method: 'POST',
    data: params
  })
}

