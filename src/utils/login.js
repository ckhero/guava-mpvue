import {setToken, getToken} from '@/utils/token'
import {getCode} from '@/utils/code'
import global from '../components/global'
import api from '../api/'

function doLogin () {
  let homeUrl = global.homePageUrl
  let authUrl = global.authPageUrl
  let _global = global
  wx.getSetting({
    success: function (res) {
      if (res.authSetting['scope.userInfo']) {
        wx.getUserInfo({
          success: function (res) {
            var iv = res.iv
            var encryptData = res.encryptedData
            console.log(res)
            // 用户已经授权过
            console.log('用户已经授权过22')
            if (getToken() === '') {
              wx.login({
                success (res) {
                  if (res.code) {
                    _global.code = res.code
                    wx.setStorage({
                      key: 'code',
                      data: res.code
                    })
                    wx.getStorageSync('code')
                    api.v1.user.login({
                      'code': res.code,
                      'iv': iv,
                      'encrypt_data': encryptData
                    }).then(res => {
                      setToken(res.data.token, homeUrl)
                    })
                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                }
              })
            } else {
              //wx.navigateTo({ url: homeUrl })
//			  wx.switchTab({ url: homeUrl })
			  wx.redirectTo({ url: homeUrl })
              return true
            }
          }
        })
      } else {
        wx.navigateTo({ url: authUrl })
        console.log('用户还未授权过')
      }
    }
  })
}

function setPhone () {
  let authUrl = global.authPageUrl + '?action=phone'
  wx.navigateTo({ url: authUrl })
}
export {doLogin, setPhone}
