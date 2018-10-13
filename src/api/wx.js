import request from '../utils/request'

export function getCode(query) {
  return request({
    url: '/api/wx/config',
    method: 'get',
    params: query
  })
}
export function getUserinfo(query) {
  return request({
    url: '/api/wx/userinfo?code='+query,
    method: 'get',
    params: query
  })
}
export function pay(params) {
  return request({
    url: '/api/wx/pay',
    method: 'POST',
    data: params
  })
}
