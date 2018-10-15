import request from '../utils/request'
import { dataToFormData } from '../utils/common'

export function yanji(query) {
  return request({
    url: '/api/yanji/yanji',
    method: 'get',
    params: query
  })
}

export function pushYanJi(params) {

  var formData = new FormData()
  dataToFormData(formData, params)
  if (params.fileList) {
    for (var i = 0; i < params.fileList.length; i++) {
      formData.append('files', params.fileList[i])
    }
  } else {
    formData.append('files', null)
  }
  formData.append('path', 'yanji')
  return request({
    url: '/api/yanji/push',
    method: 'post',
    data: formData
  })
}


