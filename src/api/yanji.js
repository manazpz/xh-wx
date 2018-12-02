import request from '../utils/request'

export function yanji(query) {
  return request({
    url: '/api/yanji/yanji',
    method: 'get',
    params: query
  })
}

export function pushYanJi(params) {
  return request({
    url: '/api/yanji/push',
    method: 'post',
    data: params
  })
}

export function updateYanJi(params) {
  return request({
    url: '/api/yanji/update',
    method: 'post',
    data: params
  })
}

export function amslerList(query) {
  return request({
    url: '/api/yanji/amsler',
    method: 'get',
    params: query
  })
}


