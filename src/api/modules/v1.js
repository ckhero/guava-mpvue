import request from '../request'

const v1 = {
  user: {
    login: data => request('v1/user/login', 'post', data),
    info: data => request('v1/user/info', 'post', data)
  }
}

export default v1
