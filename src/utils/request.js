import global_ from '@/components/global'

const host = 'https://guava.51qwer.com'
const loginUrl = '/v1/user/login' // 登陆链接
const userInfoUrl = '/v1/user/info' // 登陆链接
const rankListUrl='/v1/rank/list'
const examUrl='/v1/examination/save'
const todayLessonUrl='/v1/lesson/today'
const lessonListUrl='/v1/lesson/list'
const datumListUrl='/v1/datum/list'


// const userInfoUrl = '/v1/user/info' // 用户信息

function request (url, method = 'post', data = {}, header = {}) {
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url, // 仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        'content-type': 'application/json', // 默认值
        'x-token': global_.xToken
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: function (res) {
        wx.hideLoading()
        // reject(false)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}

function get (obj) {
  return request(obj.url, 'GET', obj.data)
}

function post (obj) {
  return request(obj.url, 'POST', obj.data)
}

function getUserInfo () {
  post({
    url: userInfoUrl,
    data: {}
  }).then(res => {
    // global_.xToken = res.data.token
  })
}
export default {
  request,
  get,
  post,
  host,
  loginUrl,
  userInfoUrl,
  getUserInfo,
  todayLessonUrl,
  rankListUrl,
  lessonListUrl,
  datumListUrl
}
