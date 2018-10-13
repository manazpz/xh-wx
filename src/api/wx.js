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
export function queryTppConfig(query) {
  return request({
    url: '/api/wx/tppConfig',
    method: 'get',
    params: query
  })
}
