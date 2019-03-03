import request from '../request'

const v1 = {
  user: {
    login: data => request('v1/user/login', 'post', data),
    info: data => request('v1/user/info', 'post', data),
    
    index:data => request('v1/home/index', 'post', data),
    
  },
  lesson: {
    detail: data => request('v1/lesson/detail', 'post', data),
    todaylesson: data => request('v1/lesson/today', 'post', data)
  }
}

export default v1
