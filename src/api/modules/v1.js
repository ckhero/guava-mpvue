import request from '../request'

const v1 = {
  user: {
    login: data => request('v1/user/login', 'post', data),
    info: data => request('v1/user/info', 'post', data),
    index: data => request('v1/home/index', 'post', data)
  },
  lesson: {
    detail: data => request('v1/lesson/detail', 'post', data),
    todaylesson: data => request('v1/lesson/today', 'post', data),
    list: data => request('v1/lesson/list', 'post', data)
  },
  examination: {
    submit: data => request('v1/examination/save', 'post', data),
    result: data => request('v1/examination/result', 'post', data)
  },
  rank: {
    list: data => request('v1/rank/list', 'post', data)
  },
  datum:{
    list: data => request('v1/datum/list', 'post', data)
  }
}

export default v1
