import request from '../utils/request'

export function yanji(query) {
  return request({
    url: '/api/yanji/yanji',
    method: 'get',
    params: query
  })
}


