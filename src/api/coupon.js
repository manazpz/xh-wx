import request from '../utils/request'

export function queryCouponList(query) {
  return request({
    url: '/api/coupon/list',
    method: 'get',
    params: query
  })
}
export function getCoupon(params) {
  return request({
    url: '/api/coupon/get',
    method: 'POST',
    data: params
  })
}
export function queryCouponUser(query) {
  return request({
    url: '/api/coupon/listuser',
    method: 'get',
    params: query
  })
}

