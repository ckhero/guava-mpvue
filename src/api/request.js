import {getToken, delToken} from '@/utils/token'
import {setPhone} from '@/utils/login'
// import {fail} from '@/pages/toast'

const host = 'https://www.goodexam.com.cn/'

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
        'x-token': getToken()
      },
      success: function (res) {
        if (res.data.code === 101003) {
          delToken()
          reject(res.data.message)
        }

        if (res.data.code === 101010) {
          setPhone()
          reject(res.data.message)
        }
        if (res.data.code !== 0) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
          reject(res.data.message)
        }
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

export default request
