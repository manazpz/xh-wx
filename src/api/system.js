import request from '../utils/request'

export function queryCustomService(query) {
  return request({
    url: '/sys/customServices',
    method: 'get',
    params: query
  })
}

export function queryCustom(query) {
  return request({
    url: '/api/customer/info',
    method: 'get',
    params: query
  })
}

export function queryUserinfos(query) {
  return request({
    url: '/api/user/list',
    method: 'get',
    params: query
  })
}
export function updateUserinfos(params) {
  return request({
    url: '/api/user/update',
    method: 'POST',
    data: params
  })
}
export function sendmsg(params) {
  return request({
    url: '/api/user/send',
    method: 'POST',
    data: params
  })
}
export function getUserIminfo(query) {
  return request({
    url: '/api/user/imList',
    method: 'get',
    params: query
  })
}
export function insertSuggestion(params) {
  return request({
    url: '/api/user/insertSuggestion',
    method: 'POST',
    data: params
  })
}
export function getUserBankinfo(query) {
  return request({
    url: '/api/user/banklist',
    method: 'get',
    params: query
  })
}
export function insertUserBank(params) {
  return request({
    url: '/api/user/insertUserBank',
    method: 'POST',
    data: params
  })
}
