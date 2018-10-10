import request from '../utils/request'

export function queryBanners(query) {
  return request({
    url: '/api/resource/list?type='+query,
    method: 'get'
  })
}
export function GetQueryString  (name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  arr = window.location.search.substr(1).match(reg);
  if(arr!==null)
    return unescape(arr[2]);
  else
    return false;
};
