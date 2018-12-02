import request from '../utils/request'
import { dataToFormData } from '../utils/common'

export function queryMyNews(query) {
  return request({
    url: '/api/news/list',
    method: 'get',
    params: query
  })
}



