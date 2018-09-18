import request from '../utils/request'

export function queryBanners(query) {
  return request({
    url: '/api/resource/list?type='+query,
    method: 'get'
  })
}
export function queryLableList(query) {
  return request({
    url: '/api/goods/lableList',
    method: 'get'
  })
}
export function queryChoiceList(query) {
  return request({
    url: '/api/goods/choiceList?model='+query,
    method: 'get'
  })
}
