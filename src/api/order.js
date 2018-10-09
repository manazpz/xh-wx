import request from '../utils/request'

export function queryReplacementCat(query) {
  return request({
    url: '/api/goods/replacementCarList',
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
export function queryAddress(query) {
  return request({
    url: '/api/address/queryAddress',
    method: 'get',
    params: query
  })
}
export function deleteAddress(params) {
  return request({
    url: '/api/address/delete',
    method: 'POST',
    data: params
  })
}


