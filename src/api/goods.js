import request from '../utils/request'

export function queryGoodsList(query) {
  return request({
    url: '/api/goods/list',
    method: 'get',
    params: query
  })
}

export function queryGoodsDetail  (id) {
  return request({
    url: '/api/goods/'+id,
    method: 'get'
  })
}

export function queryGoodsLableList(query) {
  return request({
    url: '/api/goods/lableList',
    method: 'get',
    params: query
  })
}

export function queryChoiceList(query) {
  return request({
    url: '/api/goods/choiceList',
    method: 'get',
    params: query
  })
}
export function getGoodsAppList(query) {
  return request({
    url: '/api/goods/specList/'+query,
    method: 'get',
    params: query
  })
}

