import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API // api的base_url
  // timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
  response => {
    const res = response.data
    if (res.code !== 200) {
      // Message({
      //   message: res.message,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      return Promise.reject('error')
    } else {
      if (res.data === null) {
        res.data = {}
      }
      return res
    }
  },
  error => {
    console.log('err' + error)// for debug
    // Message({
    //   message: !error.response ? error.message : !error.response.statusText ? error.message : error.response.statusText,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
