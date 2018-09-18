import request from '../utils/request'

export function queryBanners(query) {
  return request({
    url: '/api/resource/list?type='+query,
    method: 'get'
  })
}
