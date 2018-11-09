import request from '../utils/request'
import { dataToFormData } from '../utils/common'

export function queryMyNews(query) {
  return request({
    url: '/api/news/list',
    method: 'get',
    params: query
  })
}

export function pushYanJi(params) {
  return request({
    url: '/api/yanji/push',
    method: 'post',
    data: params
  })
}

export function amslerList(query) {
  return request({
    url: '/api/yanji/amsler',
    method: 'get',
    params: query
  })
}


