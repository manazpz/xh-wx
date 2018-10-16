import request from '../utils/request'
import {dataToFormData} from "../utils/common";

export function uploadFiles(params) {
  var formData = new FormData()
  dataToFormData(formData, params)
  if (params.fileList) {
    for (var i = 0; i < params.fileList.length; i++) {
      formData.append('files', params.fileList[i])
    }
  } else {
    formData.append('files', null)
  }
  return request({
    url: '/api/resource/uploadFiles',
    method: 'post',
    data: formData
  })
}

export function deleteResources(params) {
  return request({
    url: '/api/resource/delete',
    method: 'POST',
    data: params
  })
}
