import request from '../utils/request'

export function insertCollect(params) {
  return request({
    url: '/api/collect/insert',
    method: 'POST',
    data: params
  })
}

export function collectList(query) {
  return request({
    url: '/api/collect/list',
    method: 'get',
    params: query
  })
}

export function deleteCollect(params) {
  return request({
    url: '/api/collect/delete',
    method: 'POST',
    data: params
  })
}
