import request from '../utils/request'

export function queryStatement(query) {
  return request({
    url: '/api/statement/list?type='+query,
    method: 'get'
  })
}
