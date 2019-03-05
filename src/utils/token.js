// import global from '@/components/global'
import {doLogin} from '@/utils/login'

function setToken (token, url) {
  wx.setStorage({
    key: 'token',
    data: token,
    success: () => {
      wx.navigateTo({ url: url })
    },
    fail: (error) => {
      console.log(error)
      wx.showToast({
        title: 'token设置失败',
        icon: 'none'
      })
    }
  })
}

function getToken () {
  return wx.getStorageSync('token') || ''
}

function delToken () {
  wx.removeStorageSync('token')
  doLogin()
}
export {
  setToken,
  getToken,
  delToken
}
