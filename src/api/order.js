import request from '../utils/request'

export function queryReplacementCat(query) {
  return request({
    url: '/api/goods/replacementCarList',
    method: 'get',
    params: query
  })
}
