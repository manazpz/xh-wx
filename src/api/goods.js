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
export function insertReplacementCar(params) {
  return request({
    url: '/api/goods/replacementCar/insert',
    method: 'POST',
    data: params
  })
}
export function queryReplacementCar(query) {
  return request({
    url: '/api/goods/replacementCarList?openId='+query,
    method: 'get',
    params: query
  })
}
export function queryReplacementCarDetail(query) {
  return request({
    url: '/api/goods/replacementCarList?'+query,
    method: 'get',
    params: query
  })
}
export function updateReplacementCar(params) {
  return request({
    url: '/api/goods/replacementCar/update',
    method: 'POST',
    data: params
  })
}
export function deleteReplacementCar(params) {
  return request({
    url: '/api/goods/replacementCar/delete',
    method: 'POST',
    data: params
  })
}
export function recoveryList(query) {
  return request({
    url: '/api/goods/recoveryList',
    method: 'get',
    params: query
  })
}
export function insertRecoveryUser(params) {
  return request({
    url: '/api/goods/recoveryListUser/insert',
    method: 'POST',
    data: params
  })
}
export function queryrecoveryList(query) {
  return request({
    url: '/api/goods/queryrecoveryList',
    method: 'get',
    params: query
  })
}

export function queryGoodsComment(query) {
  return request({
    url: '/api/goods/queryGoodsComment',
    method: 'get',
    params: query
  })
}

export function updateHomeGoods(params) {
  return request({
    url: '/api/goods/homeGoods/update',
    method: 'POST',
    data: params
  })
}
